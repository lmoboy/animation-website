export const tools = {
    timing: {
        title: "Timing & Control",
        tabs: [
            {
                name: "Base Timing",
                description: "Core animation timing controls",
                settings: [
                    {
                        name: "duration",
                        type: "range",
                        min: 100,
                        max: 5000,
                        default: 1000,
                        unit: "ms",
                    },
                    {
                        name: "delay",
                        type: "range",
                        min: 0,
                        max: 2000,
                        default: 0,
                        unit: "ms",
                    },
                    {
                        name: "endDelay",
                        type: "range",
                        min: 0,
                        max: 2000,
                        default: 0,
                        unit: "ms",
                    },
                    {
                        name: "loop",
                        type: "select",
                        options: [
                            { label: "Once", value: 1 },
                            { label: "2x", value: 2 },
                            { label: "3x", value: 3 },
                            { label: "Infinite", value: true },
                        ],
                        default: 1,
                    },
                    {
                        name: "direction",
                        type: "select",
                        options: [
                            "normal",
                            "reverse",
                            "alternate",
                            "alternateReverse",
                        ],
                        default: "normal",
                    },
                ],
            },
            {
                name: "Playback",
                description: "Animation control parameters",
                settings: [
                    { name: "autoplay", type: "toggle", default: true },
                    {
                        name: "speed",
                        type: "range",
                        min: 0.1,
                        max: 3,
                        step: 0.1,
                        default: 1,
                    },
                ],
            },
        ],
    },

    transforms: {
        title: "Transforms",
        tabs: [
            {
                name: "3D Transforms",
                settings: [
                    {
                        name: "translateX",
                        type: "range",
                        min: -500,
                        max: 500,
                        default: 0,
                        unit: "px",
                    },
                    {
                        name: "translateY",
                        type: "range",
                        min: -500,
                        max: 500,
                        default: 0,
                        unit: "px",
                    },
                    {
                        name: "translateZ",
                        type: "range",
                        min: -500,
                        max: 500,
                        default: 0,
                        unit: "px",
                    },
                    {
                        name: "rotate",
                        type: "range",
                        min: -360,
                        max: 360,
                        default: 0,
                        unit: "deg",
                    },
                    {
                        name: "rotateX",
                        type: "range",
                        min: -360,
                        max: 360,
                        default: 0,
                        unit: "deg",
                    },
                    {
                        name: "rotateY",
                        type: "range",
                        min: -360,
                        max: 360,
                        default: 0,
                        unit: "deg",
                    },
                    {
                        name: "scale",
                        type: "range",
                        min: 0.1,
                        max: 3,
                        step: 0.1,
                        default: 1,
                    },
                    {
                        name: "scaleX",
                        type: "range",
                        min: 0.1,
                        max: 3,
                        step: 0.1,
                        default: 1,
                    },
                    {
                        name: "scaleY",
                        type: "range",
                        min: 0.1,
                        max: 3,
                        step: 0.1,
                        default: 1,
                    },
                ],
            },
            {
                name: "Transform Options",
                settings: [
                    {
                        name: "transformOrigin",
                        type: "text",
                        default: "center center",
                        placeholder: "e.g. 50% 100%",
                    },
                    {
                        name: "perspective",
                        type: "range",
                        min: 0,
                        max: 2000,
                        default: 1000,
                        unit: "px",
                    },
                ],
            },
        ],
    },

    properties: {
        title: "CSS & Attributes",
        tabs: [
            {
                name: "Basic Styles",
                settings: [
                    {
                        name: "opacity",
                        type: "range",
                        min: 0,
                        max: 1,
                        step: 0.1,
                        default: 1,
                    },
                    {
                        name: "backgroundColor",
                        type: "color",
                        default: "#6366f1",
                    },
                    { name: "color", type: "color", default: "#ffffff" },
                    {
                        name: "width",
                        type: "range",
                        min: 0,
                        max: 500,
                        default: 100,
                        unit: "px",
                    },
                    {
                        name: "height",
                        type: "range",
                        min: 0,
                        max: 500,
                        default: 100,
                        unit: "px",
                    },
                ],
            },
            {
                name: "Advanced Styles",
                settings: [
                    {
                        name: "borderRadius",
                        type: "range",
                        min: 0,
                        max: 50,
                        default: 0,
                        unit: "%",
                    },
                    {
                        name: "fontSize",
                        type: "range",
                        min: 8,
                        max: 72,
                        default: 16,
                        unit: "px",
                    },
                    {
                        name: "letterSpacing",
                        type: "range",
                        min: -10,
                        max: 20,
                        default: 0,
                        unit: "px",
                    },
                ],
            },
            {
                name: "SVG Attributes",
                settings: [
                    { name: "d", type: "path", default: "M0,0 L100,100" },
                    {
                        name: "points",
                        type: "points",
                        default: "0,0 100,100 200,50",
                    },
                    {
                        name: "strokeWidth",
                        type: "range",
                        min: 0,
                        max: 20,
                        default: 2,
                    },
                ],
            },
        ],
    },

    effects: {
        title: "Effects",
        tabs: [
            {
                name: "Filters",
                settings: [
                    {
                        name: "blur",
                        type: "range",
                        min: 0,
                        max: 20,
                        default: 0,
                        unit: "px",
                    },
                    {
                        name: "dropShadow",
                        type: "shadow",
                        default: "0 0 0 #000",
                    },
                ],
            },
            {
                name: "Physics",
                settings: [
                    {
                        name: "elasticity",
                        type: "range",
                        min: 0,
                        max: 1000,
                        default: 400,
                    },
                    {
                        name: "gravity",
                        type: "range",
                        min: 0,
                        max: 10,
                        step: 0.1,
                        default: 0,
                    },
                ],
            },
        ],
    },

    easing: {
        title: "Easing & Motion",
        tabs: [
            {
                name: "Easing Types",
                settings: [
                    {
                        name: "easing",
                        type: "select",
                        options: [
                            "linear",
                            "easeInQuad",
                            "easeOutQuad",
                            "easeInOutQuad",
                            "easeInCubic",
                            "easeOutCubic",
                            "easeInOutCubic",
                            "easeInQuart",
                            "easeOutQuart",
                            "easeInOutQuart",
                            "easeInQuint",
                            "easeOutQuint",
                            "easeInOutQuint",
                            "easeInSine",
                            "easeOutSine",
                            "easeInOutSine",
                            "easeInExpo",
                            "easeOutExpo",
                            "easeInOutExpo",
                            "easeInCirc",
                            "easeOutCirc",
                            "easeInOutCirc",
                            "easeInBack",
                            "easeOutBack",
                            "easeInOutBack",
                            "easeInElastic",
                            "easeOutElastic",
                            "easeInOutElastic",
                            "easeInBounce",
                            "easeOutBounce",
                            "easeInOutBounce",
                        ],
                        default: "easeOutQuad",
                    },
                ],
            },
            {
                name: "Spring Physics",
                settings: [
                    {
                        name: "spring",
                        type: "toggle",
                        default: false,
                    },
                    {
                        name: "tension",
                        type: "range",
                        min: 0,
                        max: 500,
                        default: 300,
                    },
                    {
                        name: "damping",
                        type: "range",
                        min: 0,
                        max: 50,
                        default: 20,
                    },
                ],
            },
            {
                name: "Custom Easing",
                settings: [
                    {
                        name: "bezier",
                        type: "bezier",
                        default: [0.42, 0, 0.58, 1],
                    },
                ],
            },
        ],
    },
    advanced: {
        title: "Advanced",
        tabs: [
            {
                name: "Staggering",
                settings: [
                    {
                        name: "stagger",
                        type: "range",
                        min: 0,
                        max: 500,
                        default: 0,
                        unit: "ms",
                    },
                    {
                        name: "staggerConfig",
                        type: "group",
                        settings: [
                            {
                                name: "each",
                                type: "range",
                                min: 0,
                                max: 500,
                                default: 100,
                                unit: "ms",
                            },
                            {
                                name: "from",
                                type: "select",
                                options: ["center", "first", "last", "rand"],
                                default: "center",
                            },
                            { name: "grid", type: "grid", default: [3, 3] },
                            {
                                name: "axis",
                                type: "select",
                                options: ["x", "y"],
                                default: "x",
                            },
                        ],
                    },
                ],
            },
            // {
            //     name: "Keyframes",
            //     type: "keyframeEditor",
            //     settings: [],
            // },
            // {
            //     name: "Callbacks",
            //     settings: [
            //         { name: "begin", type: "code", language: "javascript" },
            //         { name: "update", type: "code", language: "javascript" },
            //         { name: "complete", type: "code", language: "javascript" },
            //     ],
            // },
        ],
    },
};
