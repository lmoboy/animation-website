import anime from "animejs";
import { useCallback, useEffect, useMemo } from "react";

export default function AnimationContainer({ data, children }) 
{
    // Memoize the animation target ID to prevent unnecessary recalculations
    const targetId = useMemo(() => "animation" + Math.random().toString(36).substr(2, 9), []);

    // Memoize animation handlers to prevent recreation on each render
    const handleMouseEnter = useCallback((animation) => {
        if (animation) {
            animation.play();
        }
    }, []);

    const handleMouseLeave = useCallback((animation) => {
        if (animation) {
            animation.pause();
        }
    }, []);

    useEffect(() => {
        let animation = null;

        const initAnimation = async () => {
            try {
                console.log(data.param_ref);
                const response = await fetch(`/api/animations/${data.param_ref}`);
                const animationData = await response.json();
                
                if (!response.ok) throw new Error(animationData.error || 'Failed to fetch animation data');

                const { created_at, updated_at, id, ...strippedData } = animationData;
                
                animation = anime({
                    targets: "#" + targetId,
                    ...JSON.parse(strippedData[0] || "{}"),
                    autoplay: false,
                });

                // Add event listeners
                const container = document.getElementById(targetId + "Container");
                if (container) {
                    container.addEventListener('mouseenter', () => handleMouseEnter(animation));
                    container.addEventListener('mouseleave', () => handleMouseLeave(animation));
                }
            } catch (error) {
                console.error('Animation loading error:', error);
            }
        };

        initAnimation();

        // Cleanup function
        return () => {
            if (animation) {
                animation.pause();
                const container = document.getElementById(targetId + "Container");
                if (container) {
                    container.removeEventListener('mouseenter', () => handleMouseEnter(animation));
                    container.removeEventListener('mouseleave', () => handleMouseLeave(animation));
                }
            }
        };
    }, [data.param_ref, targetId, handleMouseEnter, handleMouseLeave]);

    return (
        <div className="flex flex-col h-full">
            {/* Animation Preview Area */}
            <div 
                id={targetId + "Container"}
                className="relative aspect-video w-full bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 backdrop-blur-xl rounded-t-lg overflow-hidden border-b border-white/5"
            >
                {/* Animation Target */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        id={targetId}
                        className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-sm shadow-lg shadow-fuchsia-500/25"
                    ></div>
                </div>
            </div>

            {/* Content Area */}
            {children}
        </div>
    );
}
