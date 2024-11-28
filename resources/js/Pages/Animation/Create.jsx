import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Tools from '@/Components/Animation/Tools';
import Timeline from '@/Components/Animation/Timeline';
import Preview from '@/Components/Animation/Preview';
import Controls from '@/Components/Animation/Controls';
import Debug from '@/Components/Animation/Debug';
import anime from 'animejs';

// Main animation creation component
export default function Create({ auth }) {
    // State management
    const [activeCategory, setActiveCategory] = useState(null);  // Currently selected tool category
    const [selectedTool, setSelectedTool] = useState(null);      // Currently selected tool
    const [toolSettings, setToolSettings] = useState({});        // Settings for all tools
    const [appliedTools, setAppliedTools] = useState({});       // Track which tools have been applied
    const [timeline, setTimeline] = useState([]);               // List of animations to play
    const [timelineOpen, setTimelineOpen] = useState(true);     // Timeline panel visibility
    const [progress, setProgress] = useState(0);                // Animation progress (0-100)
    const [isPlaying, setIsPlaying] = useState(false);          // Whether animation is playing
    const [debugMode, setDebugMode] = useState(true);          // Show debug information
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [savedAnimationId, setSavedAnimationId] = useState(null);
    const errorBoxRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        price: '0.00',
        timeline: []
    });

    // Default cube state
    const DEFAULT_CUBE_STATE = {
        translateX: '-50%',
        translateY: '-50%',
        rotate: 0,
        scale: 1,
        opacity: 1,
        borderRadius: '5px',
        backgroundColor: '#6366f1'
    };

    // Refs for DOM elements
    const progressRef = useRef(null);  // Progress bar element
    const cubeRef = useRef(null);      // Animated cube element

    // Reset cube to default state
    const resetCubeState = () => {
        if (cubeRef.current) {
            anime({
                targets: '#anim_cube',
                ...DEFAULT_CUBE_STATE,
                duration: 0
            });
        }
    };

    // Debug logging
    // useEffect(() => {
    //     if (debugMode) {
    //         console.log('State Update:', {
    //             activeCategory,
    //             selectedTool,
    //             toolSettings,
    //             timeline,
    //             isPlaying,
    //             progress
    //         });
    //     }
    // }, [activeCategory, selectedTool, toolSettings, timeline, isPlaying, progress]);

    // Reset cube position and clear timeline
    const handleClean = () => {
        setTimeline([]);
        setAppliedTools({});
        setToolSettings({});
        resetCubeState();
    };

    // Calculate total duration of all animations
    const totalDuration = timeline.reduce((total, anim) => {
        const loops = anim.loop || 1;
        return total + ((anim.duration || 1000) + (anim.delay || 0) + (anim.endDelay || 0)) * loops;
    }, 0);

    // Update progress bar during playback
    useEffect(() => {
        if (isPlaying && progressRef.current) {
            progressRef.current.style.width = `${progress}%`;
        } else if (!isPlaying && progressRef.current) {
            progressRef.current.style.width = '0%';
        }
    }, [isPlaying, progress]);

    // Handle category selection
    const handleCategoryClick = (category) => {
        console.log('Category clicked:', category);
        setActiveCategory(activeCategory === category ? null : category);
        setSelectedTool(null);
    };

    // Handle tool selection
    const handleToolClick = (tool) => {
        console.log('Tool clicked:', tool);
        // For easing tools, don't update selectedTool
        if (activeCategory === 'easing') {
            return;
        }
        setSelectedTool(selectedTool?.name === tool.name ? null : tool);
    };

    // Handle settings change
    const handleSettingsChange = (newValues) => {
        // Update applied tools tracking
        const newAppliedTools = { ...appliedTools };
        
        // For each tool in toolSettings
        Object.keys(toolSettings).forEach(tool => {
            if (!(tool in newValues)) {
                delete newAppliedTools[tool]; // Remove tool if it was removed
            }
        });
        
        // Add new/modified tools
        Object.keys(newValues).forEach(tool => {
            newAppliedTools[tool] = true;
        });
        
        setAppliedTools(newAppliedTools);
        setToolSettings(newValues);
    };

    // Add current settings to timeline as new animation
    const applyAnimation = () => {
        if (!Object.keys(toolSettings).length) {
            console.warn('No settings applied');
            return;
        }

        console.log('Applying animation with settings:', toolSettings);

        // Create base animation with defaults
        let newAnimation = {
            targets: '#anim_cube',
            duration: 1000,
            easing: 'easeInOutQuad',
            loop: toolSettings.loop?.value || 1,
            direction: toolSettings.direction?.direction || 'normal' // Fix direction parsing
        };

        // Combine all settings from different tools
        Object.entries(toolSettings).forEach(([toolName, settings]) => {
            // Handle easing types specially
            if (['linear', 'easeInOut', 'easeIn', 'easeOut', 'spring', 'elastic'].includes(toolName)) {
                const easingMap = {
                    linear: 'linear',
                    easeInOut: 'easeInOutQuad',
                    easeIn: 'easeInQuad',
                    easeOut: 'easeOutQuad',
                    spring: 'spring(1, 80, 10, 0)',
                    elastic: 'easeOutElastic(1, .5)'
                };
                newAnimation.easing = easingMap[toolName];
                return;
            }

            // Handle direction specially
            if (toolName === 'direction') {
                const directionMap = {
                    normal: 'normal',         // Regular animation from start to end
                    reverse: 'reverse',       // Animation from end to start
                    alternate: 'alternate',   // Animation goes back and forth, starting forward
                    'alternate-reverse': 'alternate-reverse' // Animation goes back and forth, starting backward
                };
                newAnimation.direction = directionMap[settings.direction] || 'normal';
                return;
            }

            // Handle other settings
            Object.entries(settings).forEach(([settingName, value]) => {
                // Add unit if needed
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

                // Special handling for color values
                if (settingName === 'color') {
                    newAnimation[toolName] = value;
                    return;
                }

                // Add unit if it exists in the map
                const unit = unitMap[toolName] || '';
                const settingWithUnit = unit ? `${value}${unit}` : value;
                
                // Map tool setting to animation property
                const animationProperty = toolName === 'distance' ? 'translate' + toolName.slice(-1).toUpperCase() :
                                        settingName === 'radius' ? 'borderRadius' :
                                        toolName;
                
                newAnimation[animationProperty] = settingWithUnit;
            });
        });

        // Add the animation to timeline
        setTimeline(prevTimeline => [...prevTimeline, newAnimation]);
    };

    // Remove all settings for a tool
    const handleRemoveSetting = (toolName) => {
        if (toolSettings[toolName]) {
            const newSettings = { ...toolSettings };
            delete newSettings[toolName];
            setToolSettings(newSettings);
        }
    };

    // Play all animations in sequence
    const playTimeline = () => {
        if (timeline.length === 0 || isPlaying) {
            console.warn('Cannot play: timeline empty or already playing');
            return;
        }

        setIsPlaying(true);

        // Reset cube to default state
        resetCubeState();

        // Create timeline
        let currentTime = 0;
        const animations = [];

        // First, create all individual animations
        timeline.forEach((animation) => {
            const loops = animation.loop || 1;
            const duration = animation.duration || 1000;
            const delay = animation.delay || 0;
            const endDelay = animation.endDelay || 0;
            const totalDuration = duration + delay + endDelay;

            // Create the animation
            const animeAnimation = anime({
                ...animation,
                loop: false,
                autoplay: false,
                delay: currentTime + delay,
            });

            // Add it multiple times based on loop count
            for (let i = 0; i < loops; i++) {
                animations.push(animeAnimation);
                currentTime += totalDuration;
            }
        });

        // Create a sequence of animations
        let currentAnimation = 0;
        const playNextAnimation = () => {
            if (currentAnimation >= animations.length) {
                setIsPlaying(false);
                setProgress(0);
                resetCubeState();
                return;
            }

            const anim = animations[currentAnimation];
            anim.play();
            
            // Update progress based on current animation
            const updateProgress = () => {
                const overallProgress = ((currentAnimation + (anim.progress || 0) / 100) / animations.length) * 100;
                setProgress(overallProgress);
            };

            anim.update = updateProgress;
            
            anim.complete = () => {
                currentAnimation++;
                playNextAnimation();
            };
        };

        // Start playing
        playNextAnimation();
    };

    // Handle save form submission
    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            if (!data.name.trim()) {
                throw new Error('Please enter a name for your animation');
            }
            if (timeline.length === 0) {
                throw new Error('Please add at least one animation to the timeline');
            }
            if (isNaN(parseFloat(data.price)) || parseFloat(data.price) < 0) {
                throw new Error('Please enter a valid price');
            }

            // Update form data with current timeline
            setData('timeline', timeline);

            // Use Inertia's post with callbacks
            post('/animations', {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (response) => {
                    // Handle success
                    if (response?.props?.animation?.id) {
                        setSavedAnimationId(response.props.animation.id);
                    }
                    setError({
                        message: 'Animation created successfully! You will be redirected to view it shortly.',
                        type: 'success'
                    });
                    // Reset form
                    setData({
                        name: '',
                        description: '',
                        price: '0.00',
                        timeline: []
                    });
                },
                onError: (errors) => {
                    // Handle validation errors
                    const firstError = Object.values(errors)[0];
                    setError({
                        message: firstError || 'An error occurred while saving the animation',
                        type: 'error'
                    });
                    // Animate error box
                    if (errorBoxRef.current) {
                        anime({
                            targets: errorBoxRef.current,
                            translateX: [
                                { value: -10, duration: 100 },
                                { value: 10, duration: 100 },
                                { value: -5, duration: 100 },
                                { value: 5, duration: 100 },
                                { value: 0, duration: 100 }
                            ],
                            easing: 'easeInOutSine'
                        });
                    }
                }
            });
        } catch (error) {
            setError({
                message: error.message || 'An error occurred while saving the animation',
                type: 'error'
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Animation</h2>}
        >
            <Head>
                <title>Create Animation</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setIsSaving(!isSaving)}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            {isSaving ? 'Cancel' : 'Save Animation'}
                        </button>
                    </div>
                    <div className="flex gap-6 relative overflow-hidden">
                        {/* Main content */}
                        <div 
                            className={`flex gap-6 transition-all duration-500 ease-in-out ${
                                isSaving ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'
                            }`}
                            style={{ width: '100%' }}
                        >
                            {/* Tools */}
                            <Tools
                                activeCategory={activeCategory}
                                selectedTool={selectedTool}
                                toolSettings={toolSettings}
                                appliedTools={appliedTools}
                                onCategoryClick={handleCategoryClick}
                                onToolClick={handleToolClick}
                                onSettingsChange={handleSettingsChange}
                                onRemoveSetting={handleRemoveSetting}
                            />

                            {/* Main Content */}
                            <div className="flex-1 space-y-6">
                                {/* Preview */}
                                <Preview cubeRef={cubeRef} />

                                {/* Controls */}
                                <Controls
                                    toolSettings={toolSettings}
                                    timeline={timeline}
                                    onApply={applyAnimation}
                                    onPlay={playTimeline}
                                />

                                {/* Timeline */}
                                <Timeline
                                    timeline={timeline}
                                    timelineOpen={timelineOpen}
                                    totalDuration={totalDuration}
                                    progressRef={progressRef}
                                    onToggle={() => setTimelineOpen(!timelineOpen)}
                                    onClear={handleClean}
                                    onRemoveAnimation={(index) => {
                                        console.log('Removing animation at index:', index);
                                        const newTimeline = [...timeline];
                                        newTimeline.splice(index, 1);
                                        setTimeline(newTimeline);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Save Form */}
                        <div 
                            className={`absolute top-0 right-0 w-full h-full transition-transform duration-500 ease-in-out ${
                                isSaving ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        >
                            <div className="flex items-center justify-center w-full h-full">
                                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 w-[500px] relative">
                                    {error && (
                                        <div 
                                            ref={errorBoxRef}
                                            className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg 
                                                ${error.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                                                animate-fade-in`}
                                            style={{
                                                animation: 'fadeIn 0.3s ease-in-out'
                                            }}
                                        >
                                            {error.message}
                                            {error.type === 'success' && (
                                                <div className="text-sm opacity-75 mt-1">
                                                    Animation ID: {savedAnimationId}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <h3 className="text-xl font-semibold text-purple-300 mb-6">Save Animation</h3>
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                                Animation Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                                                placeholder="Enter animation name"
                                                disabled={processing}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                                                Price (USD)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    min="0"
                                                    step="0.01"
                                                    value={data.price}
                                                    onChange={e => setData('price', e.target.value)}
                                                    className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                                                    placeholder="0.00"
                                                    disabled={processing}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                                                rows="3"
                                                placeholder="Enter animation description"
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsSaving(false);
                                                    setError(null);
                                                }}
                                                className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                                                disabled={processing}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className={`px-4 py-2 bg-purple-500 text-white rounded-lg transition-colors ${
                                                    processing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-purple-600'
                                                }`}
                                                disabled={processing}
                                            >
                                                {processing ? 'Saving...' : 'Save Animation'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Debug Panel */}
            {debugMode && (
                <Debug
                    state={{
                        activeCategory,
                        selectedTool,
                        toolSettings,
                        timeline,
                        isPlaying,
                        progress,
                        totalDuration
                    }}
                />
            )}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 10px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
