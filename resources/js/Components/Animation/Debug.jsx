import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Debug({ state }) {
    const [isExpanded, setIsExpanded] = useState(true);


if(import.meta.env.VITE_PRODUCTION != "local" || import.meta.env.VITE_DEBUG != "true")
    return(<></>)
else
    return (
        <div className="fixed bottom-4 right-4 z-[100]">
            <div className={`
                bg-slate-900 rounded-md border border-slate-700
                transition-all duration-300 ease-in-out flex flex-col
                ${isExpanded ? 'h-[500px] w-96' : 'h-10 w-40'}
            `}>
                {/* Header */}
                <div className="flex-none px-3 py-2 bg-slate-800 rounded-t-md">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white"
                        >
                            <span>Debug</span>
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
                                    className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-sm hover:bg-slate-600"
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Content */}
                {isExpanded && (
                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 space-y-2">
                            {Object.entries(state).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                    <div className="text-xs font-medium text-slate-400">{key}</div>
                                    <pre className="text-xs bg-slate-800 rounded-sm p-2 overflow-x-auto text-slate-200 font-mono">
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
