import { useRef, useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";

export default function AnimationCard({
    animation,
    ownedAnimations,
    horizontal = false,
    className = "",
    onSelect,
}) {
    const cardRef = useRef(null);
    const svgRef = useRef(null);
    const cubeRef = useRef(null);
    const animationID = `anim_card_${animation.id}`;
    const [views, setViews] = useState(animation.views);
    const [isSVG, setIsSVG] = useState(false);

    useEffect(() => {
        const hasSVG = animation.timeline?.some(
            (step) => step.properties?.d || step.properties?.points
        );
        setIsSVG(hasSVG);
    }, [animation]);

    const playPreview = () => {
        if (!animation.timeline?.length) return;

        const targets = isSVG ? svgRef.current : cubeRef.current;
        anime.remove(targets);

        // Reset to initial state matching animation parameters
        anime.set(targets, {
            translateX: "0px",
            translateY: "0px",
            rotate: "0deg",
            scale: 1,
            opacity: 1,
            backgroundColor: "#a855f7",
        });

        // Create timeline with all steps
        const tl = anime.timeline({
            loop: true,
            autoplay: true,
            easing: "linear",
        });

        animation.timeline.forEach((step) => {
            const config = {
                targets,
                duration: step.duration || 1000,
                easing: step.easing || "easeInOutQuad",
                delay: step.delay || 0,
                endDelay: step.endDelay || 0,
                direction: step.direction || "normal",
                ...step.properties,
            };

            // Convert numeric values to proper units
            const unitMap = {
                translateX: "px",
                translateY: "px",
                translateZ: "px",
                rotate: "deg",
                rotateX: "deg",
                rotateY: "deg",
                scale: "",
                scaleX: "",
                scaleY: "",
            };

            Object.entries(config).forEach(([key, value]) => {
                if (unitMap[key] && typeof value === "number") {
                    config[key] = `${value}${unitMap[key]}`;
                }
            });

            tl.add(config);
        });
    };

    const stopPreview = () => {
        const targets = isSVG ? svgRef.current : cubeRef.current;
        anime.remove(targets);
        anime.set(targets, {
            translateX: "0px",
            translateY: "0px",
            rotate: "0deg",
            scale: 1,
            opacity: 1,
            backgroundColor: "#a855f7",
        });
    };
    const handleClick = () => {
        if (!ownedAnimations.includes(animation.id)) {
            onSelect?.(animation);
        }
    };

    const baseClasses =
        "group relative bg-gray-900/50 backdrop-blur-xl overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10 hover:border-purple-500/50";
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
            <div
                className={`relative ${
                    horizontal ? "w-48 h-32" : "w-full aspect-video"
                } bg-black/50 overflow-hidden`}
            >
                {isSVG ? (
                    <svg
                        ref={svgRef}
                        id={animationID}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
                        viewBox="0 0 100 100"
                    >
                        <path
                            fill="currentColor"
                            className="text-purple-500"
                            d="M50 0 L100 50 L50 100 L0 50 Z"
                        />
                    </svg>
                ) : (
                    <div
                        ref={cubeRef}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg"
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    />
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                    {animation.featured && (
                        <span className="inline-flex items-center rounded-md bg-yellow-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-yellow-300 ring-1 ring-inset ring-yellow-500/30">
                            Featured
                        </span>
                    )}

                    {animation.price > 0 && (
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-purple-300 ring-1 ring-inset ring-purple-500/30">
                            ${animation.price}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        {animation.name}
                    </h3>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-md">
                        {((animation.duration || 0) / 1000).toFixed(1)}s
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{animation.user?.name}</span>
                    <span>•</span>
                    <span>
                        {views >= 1000
                            ? `${(views / 1000).toFixed(1)}k`
                            : views.toLocaleString()}{" "}
                        views
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>
                        {new Date(animation.created_at).toLocaleDateString()}
                    </span>
                    {animation.trending && (
                        <>
                            <span>•</span>
                            <span className="inline-flex items-center text-pink-300">
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                #{animation.trendingRank}
                            </span>
                        </>
                    )}
                </div>

                {/* Price Badge for Unowned Animations */}
                {!ownedAnimations.includes(animation.id) && (
                    <div className="mt-2">
                        {animation.price === 0 ? (
                            <span className="inline-flex items-center rounded-md bg-emerald-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                                Free
                            </span>
                        ) : (
                            <span className="inline-flex items-center rounded-md bg-purple-500/10 backdrop-blur-sm px-2 py-1 text-xs font-medium text-purple-300 ring-1 ring-inset ring-purple-500/30">
                                ${animation.price}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
