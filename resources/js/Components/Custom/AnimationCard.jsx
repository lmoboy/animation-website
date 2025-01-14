import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import anime from 'animejs';

export default function AnimationCard({ 
    animation,
    horizontal = false,
    className = "",
    onSelect
}) {
    const cardRef = useRef(null);
    const previewCubeRef = useRef(null);
    const [views, setViews] = useState(animation.views);

    const playPreview = () => {
        if (!animation.timeline?.length || !previewCubeRef.current) return;

        // Define unit map for properties that need units
        const unitMap = {
            translateX: 'px',
            translateY: 'px',
            rotate: 'deg',
            scale: '',
            skewX: 'deg',
            skewY: 'deg',
            opacity: '',
            borderRadius: '%'
        };

        // Reset cube state
        anime({
            targets: previewCubeRef.current,
            translateX: '-50%',
            translateY: '-50%',
            rotate: '0deg',
            scale: 1,
            skewX: '0deg',
            skewY: '0deg',
            opacity: 1,
            borderRadius: '5px',
            backgroundColor: '#a855f7',
            duration: 0
        });

        // Play first animation from timeline
        const previewAnimation = animation.timeline[0];
        
        // Process animation properties to add units
        const processedAnimation = {};
        Object.entries(previewAnimation).forEach(([key, value]) => {
            if (unitMap.hasOwnProperty(key)) {
                processedAnimation[key] = unitMap[key] ? value + unitMap[key] : value;
            } else {
                processedAnimation[key] = value;
            }
        });

        // Create the animation
        anime({
            targets: previewCubeRef.current,
            ...processedAnimation,
            duration: previewAnimation.duration || 1000,
            loop: true,
            direction: previewAnimation.direction || 'normal',
            easing: previewAnimation.easing || 'easeInOutQuad',
            complete: function(anim) {
                // Reset to initial state when animation completes
                anime({
                    targets: previewCubeRef.current,
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: '0deg',
                    scale: 1,
                    skewX: '0deg',
                    skewY: '0deg',
                    opacity: 1,
                    borderRadius: '5px',
                    backgroundColor: '#a855f7',
                    duration: 0
                });
            }
        });
    };

    const stopPreview = () => {
        if (!previewCubeRef.current) return;
        anime.remove(previewCubeRef.current);
        
        // Reset to initial state
        anime({
            targets: previewCubeRef.current,
            translateX: '-50%',
            translateY: '-50%',
            rotate: '0deg',
            scale: 1,
            skewX: '0deg',
            skewY: '0deg',
            opacity: 1,
            borderRadius: '5px',
            backgroundColor: '#a855f7',
            duration: 0
        });
    };

    const handleClick = async () => {
        try {
            // Increment views
            const response = await axios.post(`/animations/${animation.id}/views`);
            setViews(response.data.views);
            
            // Call onSelect callback
            onSelect(animation);
        } catch (error) {
            console.error('Error incrementing views:', error);
            // Still call onSelect even if view increment fails
            onSelect(animation);
        }
    };

    useEffect(() => {
        if (previewCubeRef.current) {
            animation.previewRef = previewCubeRef;
        }
    }, [previewCubeRef.current]);

    const baseClasses = "group relative bg-gray-900/50 backdrop-blur-xl overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10 hover:border-purple-500/50";
    const orientationClasses = horizontal
        ? "flex flex-row space-x-4"
        : "flex flex-col";

    return (
        <div 
            ref={cardRef}
            className={`${baseClasses} ${orientationClasses} ${className}`}
            onMouseEnter={playPreview}
            onMouseLeave={stopPreview}  
            onClick={handleClick}
        >
            {/* Preview Container */}
            <div className={`relative ${horizontal ? 'w-48 h-32' : 'w-full aspect-video'} bg-black/50 overflow-hidden`}>
                {/* Center cube */}
                <div
                    ref={previewCubeRef}
                    id="anim_cube"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg"
                    style={{
                        perspective: '400px',
                        transformStyle: 'preserve-3d'
                    }}
                />
                
                {animation.featured && (
                    <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center rounded-md bg-yellow-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-yellow-300 ring-1 ring-inset ring-yellow-500/30">
                            Featured
                        </span>
                    </div>
                )}
                
                {animation.trending && (
                    <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-full bg-pink-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-pink-300 ring-1 ring-inset ring-pink-500/30">
                            #{animation.trendingRank}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative flex-1 p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
                        {animation.name}
                    </h3>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-md">
                        {((animation.duration || 0) / 1000).toFixed(1)}s
                    </span>
                </div>

                <div className="mt-1 flex items-center space-x-1 text-sm text-gray-400">
                    <span>{animation.user?.name}</span>
                    <span>•</span>
                    <span>{views >= 1000 
                        ? `${(views / 1000).toFixed(1)}k` 
                        : views.toLocaleString()
                    } views</span>
                    <span>•</span>
                    <span>{new Date(animation.created_at).toLocaleDateString()}</span>
                </div>

                {/* Price Tag */}
                <div className="mt-2">
                    {animation.price === 0 ? (
                        <span className="inline-flex items-center rounded-md bg-emerald-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                            Free
                        </span>
                    ) : animation.price && (
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-purple-300 ring-1 ring-inset ring-purple-500/30">
                            ${animation.price}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
