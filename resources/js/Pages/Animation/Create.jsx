import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { tools } from '@/Data/tools';
import Tools from '@/Components/Animation/Tools';
import Timeline from '@/Components/Animation/Timeline';
import Preview from '@/Components/Animation/Preview';
import Controls from '@/Components/Animation/Controls';
import Debug from '@/Components/Animation/Debug';
import Toast from '@/Components/Custom/Toast';
import anime from 'animejs';

export default function Create({ auth }) {
    // State management
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [toolSettings, setToolSettings] = useState({});
    const [appliedTools, setAppliedTools] = useState({});
    const [timeline, setTimeline] = useState([]);
    const [timelineOpen, setTimelineOpen] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [debugMode, setDebugMode] = useState(import.meta.env.VITE_DEBUG == "true");
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '0.00',
    });
    const [processing, setProcessing] = useState(false);

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
        const loops = parseInt(anim.loop) || 1;
        const duration = parseInt(anim.duration) || 1000;
        const delay = parseInt(anim.delay) || 0;
        const endDelay = parseInt(anim.endDelay) || 0;
        const animationDuration = (duration + delay + endDelay) * loops;
        console.log('Animation duration:', {
            duration,
            delay,
            endDelay,
            loops,
            total: animationDuration
        });
        return total + animationDuration;
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
        
        // Flatten the settings structure
        const flattenedSettings = {};
        Object.entries(newValues).forEach(([tool, value]) => {
            // Handle easing types
            if (['linear', 'easeInOut', 'easeIn', 'easeOut', 'spring', 'elastic'].includes(tool)) {
                flattenedSettings.easing = tool;
                return;
            }
            
            // Handle nested objects
            if (typeof value === 'object') {
                const [key, val] = Object.entries(value)[0];
                flattenedSettings[key] = val;
            } else {
                flattenedSettings[tool] = value;
            }
        });
        
        setAppliedTools(newAppliedTools);
        setToolSettings(flattenedSettings);
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
            duration: toolSettings.duration || 1000,
            easing: toolSettings.easing || 'easeInOutQuad', // Directly use the easing value from settings
            loop: toolSettings.loop || 1,
            direction: toolSettings.direction || 'normal'
        };
    
        // Add animation properties with units
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
    
        // Apply settings to animation
        Object.entries(toolSettings).forEach(([property, value]) => {
            // Skip special properties already handled
            if (['easing', 'loop', 'direction', 'duration'].includes(property)) return;
    
            // Add unit if needed
            const unit = unitMap[property] || '';
            const valueWithUnit = unit ? `${value}${unit}` : value;
    
            // Handle special property mappings
            const animationProperty = property === 'radius' ? 'borderRadius' : property;
            newAnimation[animationProperty] = valueWithUnit;
        });
    
        // Add the animation to timeline
        setTimeline(prevTimeline => [...prevTimeline, newAnimation]);
    };

    // Remove all settings for a tool
    const handleRemoveSetting = (toolName) => {
        const newSettings = { ...toolSettings };
        
        // Get all settings associated with this tool from the tool definition
        const tool = Object.values(tools)
            .flatMap(category => category.tabs)
            .find(t => t.name === toolName);
            
        if (tool?.settings) {
            // Remove each setting associated with this tool
            tool.settings.forEach(setting => {
                delete newSettings[setting.name];
            });
            
            // Update the settings
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
        const animations = [];
        let totalDuration = 0;

        // Calculate total duration for progress calculation
        const totalTime = timeline.reduce((total, anim) => {
            const loops = anim.loop || 1;
            const duration = anim.duration || 1000;
            const delay = anim.delay || 0;
            const endDelay = anim.endDelay || 0;
            return total + (duration + delay + endDelay) * loops;
        }, 0);

        // Create all individual animations
        timeline.forEach((animation, index) => {
            const loops = animation.loop || 1;
            const duration = animation.duration || 1000;
            const delay = animation.delay || 0;
            const endDelay = animation.endDelay || 0;

            // Create a new animation instance for each loop
            for (let i = 0; i < loops; i++) {
                const animeAnimation = anime({
                    targets: '.cube',  // Ensure we're targeting the cube
                    ...animation,
                    loop: false,
                    autoplay: false,
                    delay: delay,  // Use the animation's own delay property
                    duration: duration,
                    endDelay: endDelay,
                    complete: function(anim) {
                        const nextIndex = animations.indexOf(anim) + 1;
                        if (nextIndex < animations.length) {
                            animations[nextIndex].play();
                        } else {
                            setIsPlaying(false);
                            setProgress(0);
                            resetCubeState();
                        }
                    },
                    update: function(anim) {
                        // Calculate overall progress based on current animation's progress
                        const currentIndex = animations.indexOf(anim);
                        const previousDuration = animations
                            .slice(0, currentIndex)
                            .reduce((total, a) => total + (a.duration || 1000), 0);
                        
                        const currentProgress = (anim.progress / 100) * duration;
                        const overallProgress = ((previousDuration + currentProgress) / totalTime) * 100;
                        setProgress(Math.min(overallProgress, 100));
                    }
                });
                animations.push(animeAnimation);
                totalDuration += duration + delay + endDelay;
            }
        });

        // Start the first animation
        if (animations.length > 0) {
            animations[0].play();
        }
    };

    // Handle save form submission
    const handleSave = async (e) => {
        e.preventDefault();
        setProcessing(true);
        
        try {
            if (!formData.name.trim()) {
                throw new Error('Please enter a name for your animation');
            }
            if (timeline.length === 0) {
                throw new Error('Please add at least one animation to the timeline');
            }
            if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
                throw new Error('Please enter a valid price');
            }

            // Use Inertia router to submit the form with timeline as JSON
            router.post('/animations', {
                ...formData,
                timeline: timeline // Send timeline directly as JSON
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setToastMessage('Animation saved successfully!');
                    setToastType('success');
                    setShowToast(true);
                    
                    // Reset all states
                    setFormData({
                        name: '',
                        description: '',
                        price: '0.00',
                    });
                    setTimeline([]);
                    setAppliedTools({});
                    setToolSettings({});
                    setProgress(0);
                    setIsPlaying(false);
                    setIsSaving(false);
                    resetCubeState();
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    setToastMessage(firstError || 'An error occurred while saving the animation');
                    setToastType('error');
                    setShowToast(true);
                },
                onFinish: () => {
                    setProcessing(false);
                }
            });
        } catch (error) {
            setToastMessage(error.message);
            setToastType('error');
            setShowToast(true);
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            >
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
                        {isSaving && (
                            <div 
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) {
                                        setIsSaving(false);
                                    }
                                }}
                            >
                                <div className="flex items-center justify-center w-full h-full" onClick={e => e.stopPropagation()}>
                                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 w-[500px] relative">
                                        <h3 className="text-xl font-semibold text-purple-300 mb-6">Save Animation</h3>
                                        <form onSubmit={handleSave} className="space-y-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Animation Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                                                        value={formData.price}
                                                        onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
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
                                                    value={formData.description}
                                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                                                        setShowToast(false);
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
                        )}

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
                        <Toast
                            show={showToast}
                            message={toastMessage}
                            type={toastType}
                            onClose={() => setShowToast(false)}
                            duration={3000}
                        />
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
