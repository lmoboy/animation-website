import React from "react";

export default function Timeline({
    timeline,
    timelineOpen,
    totalDuration,
    progressRef,
    onToggle,
    onClear,
    onRemoveAnimation,
}) {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggle}
                            className="text-gray-400 hover:text-purple-300 transition-colors"
                        >
                            <svg
                                className={`w-5 h-5 transform transition-transform ${
                                    timelineOpen ? "rotate-0" : "-rotate-90"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold text-purple-300">
                            Timeline
                        </h3>
                        <span className="text-sm text-gray-400">
                            {(totalDuration / 1000).toFixed(2)}s total
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClear}
                            disabled={timeline.length === 0}
                            className={`text-sm px-3 py-1 rounded-lg ${
                                timeline.length > 0
                                    ? "text-red-400 hover:bg-red-500/10"
                                    : "text-gray-600 cursor-not-allowed"
                            }`}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-800/50 overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full w-0 bg-purple-500"
                ></div>
            </div>

            {/* Timeline Content */}
            <div
                className={`timeline-content overflow-hidden transition-all duration-300 ${
                    timelineOpen ? "max-h-[500px]" : "max-h-0"
                }`}
            >
                <div className="p-4 space-y-2 overflow-y-auto max-h-[300px] sm:max-h-[500px]">
                    {timeline.map((animation, index) => (
                        <div
                            key={index}
                            className="timeline-item bg-gray-800/50 rounded-lg p-3 text-gray-300 relative group text-sm sm:text-base"
                        >
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-[80%] bg-purple-500/50 rounded-full"></div>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    {Object.entries(animation)
                                        .filter(
                                            ([key]) =>
                                                ![
                                                    "targets",
                                                    "complete",
                                                    "update",
                                                ].includes(key)
                                        )
                                        .map(([key, value]) => (
                                            <div key={key} className="text-sm">
                                                <span className="text-purple-300">
                                                    {key}:
                                                </span>{" "}
                                                {typeof value === "function"
                                                    ? "[Function]"
                                                    : value}
                                            </div>
                                        ))}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onRemoveAnimation(index)}
                                        className="text-gray-400 hover:text-red-400 p-1"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {((animation.duration || 1000) / 1000).toFixed(
                                    1
                                )}
                                s
                                {animation.delay > 0 &&
                                    ` + ${(animation.delay / 1000).toFixed(
                                        1
                                    )}s delay`}
                                {animation.endDelay > 0 &&
                                    ` + ${(animation.endDelay / 1000).toFixed(
                                        1
                                    )}s end delay`}
                                {animation.loop > 1 &&
                                    ` × ${animation.loop} loops`}
                            </div>
                        </div>
                    ))}
                    {timeline.length === 0 && (
                        <div className="text-center text-gray-400 py-4 sm:py-8 text-sm sm:text-base">
                            No animations added yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
