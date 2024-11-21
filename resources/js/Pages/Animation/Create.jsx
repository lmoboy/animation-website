import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
            loop: toolSettings.loop?.value || 1
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
        const timelineAnimation = anime.timeline({
            easing: 'linear',
            update: function(anim) {
                setProgress((anim.progress || 0));
            },
            complete: function() {
                setIsPlaying(false);
                setProgress(0);
            }
        });

        // Add each animation to the timeline with loop handling
        timeline.forEach((animation, index) => {
            const loops = animation.loop || 1;
            const animationWithLoop = {
                ...animation,
                loop: loops
            };
            timelineAnimation.add(animationWithLoop);
        });
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
                    <div className="flex gap-6">
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
        </AuthenticatedLayout>
    );
}
