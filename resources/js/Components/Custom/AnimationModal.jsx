import { Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import anime from 'animejs';

export default function AnimationModal({ 
    animation, 
    isOpen, 
    onClose 
}) {
    const cubeRef = useRef(null);
    const timelineRef = useRef(null);
    const currentAnimationIndex = useRef(0);

    const resetCubeState = () => {
        if (!cubeRef.current) return;
        
        anime({
            targets: cubeRef.current,
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

    const playAnimation = () => {
        if (!animation?.timeline?.length || !cubeRef.current) return;

        // Clear any existing animations
        if (timelineRef.current) {
            timelineRef.current.pause();
            timelineRef.current = null;
        }

        resetCubeState();
        currentAnimationIndex.current = 0;

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

        // Create timeline
        const animations = [];
        let totalDuration = 0;

        animation.timeline.forEach((anim, index) => {
            const duration = anim.duration || 1000;
            const delay = anim.delay || 0;
            const endDelay = anim.endDelay || 0;

            // Process animation properties to add units
            const processedAnimation = {};
            Object.entries(anim).forEach(([key, value]) => {
                if (unitMap.hasOwnProperty(key)) {
                    processedAnimation[key] = unitMap[key] ? value + unitMap[key] : value;
                } else {
                    processedAnimation[key] = value;
                }
            });

            const animeAnimation = anime({
                targets: cubeRef.current,
                ...processedAnimation,
                duration: duration,
                delay: delay,
                endDelay: endDelay,
                easing: anim.easing || 'easeInOutQuad',
                autoplay: false,
                complete: function() {
                    currentAnimationIndex.current++;
                    if (currentAnimationIndex.current >= animations.length) {
                        currentAnimationIndex.current = 0;
                        resetCubeState();
                        if (animations.length > 0) {
                            animations[0].play();
                        }
                    }
                }
            });

            animations.push(animeAnimation);
            totalDuration += duration + delay + endDelay;
        });

        timelineRef.current = {
            animations,
            totalDuration,
            pause: () => {
                animations.forEach(anim => {
                    anim.pause();
                });
            },
            play: () => {
                if (animations.length > 0) {
                    resetCubeState();
                    animations[0].play();
                }
            }
        };

        timelineRef.current.play();
    };

    useEffect(() => {
        if (isOpen && animation) {
            playAnimation();
        }
        return () => {
            if (timelineRef.current) {
                timelineRef.current.pause();
            }
        };
    }, [isOpen, animation]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900/90 backdrop-blur-xl p-6 text-left align-middle shadow-xl transition-all border border-white/10">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white mb-4"
                                >
                                    {animation?.name}
                                </Dialog.Title>

                                {/* Preview Container */}
                                <div className="relative w-full aspect-video bg-black/50 rounded-lg overflow-hidden mb-4">
                                    <div
                                        ref={cubeRef}
                                        className="absolute left-1/2 top-1/2 w-16 h-16 bg-purple-500"
                                    />
                                </div>

                                {/* Animation Info */}
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <span>Created by {animation?.user?.name}</span>
                                        <span>{new Date(animation?.created_at).toLocaleDateString()}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        {animation?.price === 0 ? (
                                            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                                                Free
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-300 ring-1 ring-inset ring-purple-500/30">
                                                ${animation?.price}
                                            </span>
                                        )}
                                        
                                        <span className="inline-flex items-center rounded-md bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-500/30">
                                            {animation?.views} views
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                                        onClick={() => playAnimation()}
                                    >
                                        Play Again
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
