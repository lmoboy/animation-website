// This file defines the structure of all animation tools and their settings
export const tools = {
    // Timing category: Controls animation timing aspects
    timing: {
        title: 'Timing',
        tabs: [
            {
                name: 'delay',
                description: 'Add delay before animation starts',
                settings: [
                    { name: 'delay', type: 'range', min: 0, max: 2000, default: 0, unit: 'ms' }
                ]
            },
            {
                name: 'endDelay',
                description: 'Add delay after animation ends',
                settings: [
                    { name: 'endDelay', type: 'range', min: 0, max: 2000, default: 0, unit: 'ms' }
                ]
            },
            {
                name: 'duration',
                description: 'How long the animation takes to complete',
                settings: [
                    { name: 'duration', type: 'range', min: 100, max: 2000, default: 1000, unit: 'ms' }
                ]
            },
            {
                name: 'loop',
                description: 'Number of times to repeat the animation',
                settings: [
                    { name: 'loop', type: 'range', min: 1, max: 10, default: 1, unit: '' }
                ]
            },
            {
                name: 'direction',
                description: 'Direction of the animation',
                settings: [
                    { name: 'direction', type: 'select', options: ['normal', 'reverse', 'alternate'], default: 'normal' }
                ]
            }
        ]
    },

    // Transform category: Controls spatial transformations
    transform: {
        title: 'Transform',
        tabs: [
            { 
                name: 'translateX', 
                description: 'Move element horizontally', 
                settings: [
                    { name: 'distance', type: 'range', min: -200, max: 200, default: 100, unit: 'px' },
                ]
            },
            { 
                name: 'translateY',
                description: 'Move element vertically',
                settings: [
                    { name: 'distance', type: 'range', min: -200, max: 200, default: 100, unit: 'px' },
                ]
            },
            { 
                name: 'rotate',
                description: 'Rotate element around its center',
                settings: [
                    { name: 'angle', type: 'range', min: -360, max: 360, default: 90, unit: 'deg' },
                ]
            },
            {
                name: 'scale',
                description: 'Scale element size',
                settings: [
                    { name: 'scale', type: 'range', min: 0.1, max: 2, step: 0.1, default: 1.5, unit: 'x' }
                ]
            },
            {
                name: 'skew',
                description: 'Skew element',
                settings: [
                    { name: 'skewX', type: 'range', min: -45, max: 45, default: 0, unit: 'deg' },
                    { name: 'skewY', type: 'range', min: -45, max: 45, default: 0, unit: 'deg' }
                ]
            }
        ]
    },

    // Property category: Controls CSS properties
    property: {
        title: 'Property',
        tabs: [
            {
                name: 'opacity',
                description: 'Change element transparency',
                settings: [
                    { name: 'opacity', type: 'range', min: 0, max: 1, step: 0.1, default: 0.5, unit: '' }
                ]
            },
            {
                name: 'backgroundColor',
                description: 'Change background color',
                settings: [
                    { name: 'color', type: 'color', default: '#6366f1' }
                ]
            },
            {
                name: 'borderRadius',
                description: 'Change border roundness',
                settings: [
                    { name: 'radius', type: 'range', min: 0, max: 50, default: 25, unit: '%' }
                ]
            }
        ]
    },

    // Easing category: Controls animation acceleration curves
    easing: {
        title: 'Easing',
        tabs: [
            { 
                name: 'linear',
                description: 'Constant speed throughout animation'
            },
            { 
                name: 'easeInOut',
                description: 'Smooth acceleration and deceleration'
            },
            {
                name: 'easeIn',
                description: 'Gradual acceleration from zero velocity'
            },
            {
                name: 'easeOut',
                description: 'Gradual deceleration to zero velocity'
            },
            {
                name: 'spring',
                description: 'Bouncy spring-like animation'
            },
            {
                name: 'elastic',
                description: 'Elastic bouncing effect'
            }
        ]
    }
};
