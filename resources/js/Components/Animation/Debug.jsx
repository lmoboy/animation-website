import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Debug({ state }) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className={`
                bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-800 
                transition-all duration-300 ease-in-out flex flex-col
                ${isExpanded ? 'h-[500px] w-96' : 'h-12 w-48'}
            `}>
                {/* Header */}
                <div className="flex-none p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200"
                        >
                            <span>Debug Panel</span>
                            {isExpanded ? (
                                <ChevronDownIcon className="w-4 h-4" />
                            ) : (
                                <ChevronUpIcon className="w-4 h-4" />
                            )}
                        </button>
                        {isExpanded && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => console.clear()}
                                    className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
                                >
                                    Clear Console
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Content */}
                {isExpanded && (
                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-4 space-y-4">
                            {Object.entries(state).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                    <div className="text-xs font-medium text-purple-200">{key}</div>
                                    <pre className="text-xs bg-gray-800/50 rounded p-2 overflow-x-auto text-white whitespace-pre-wrap break-words">
                                        {JSON.stringify(value, null, 2)}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
