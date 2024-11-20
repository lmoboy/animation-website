import React from 'react';

export default function Controls({ toolSettings, timeline, onApply, onPlay }) {
    const hasSettings = Object.keys(toolSettings).length > 0;

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
            <div className="flex gap-4">
                <button
                    onClick={onApply}
                    disabled={!hasSettings}
                    className={`px-4 py-2 bg-purple-500 text-white rounded-lg transition-colors ${
                        hasSettings ? 'hover:bg-purple-600' : 'opacity-50 cursor-not-allowed'
                    }`}
                    title={hasSettings ? 'Apply current settings as animation' : 'Set some settings first'}
                >
                    Apply Animation
                </button>
                <button
                    onClick={onPlay}
                    disabled={timeline.length === 0}
                    className={`px-4 py-2 bg-gray-700 text-white rounded-lg transition-colors ${
                        timeline.length > 0 ? 'hover:bg-gray-600' : 'opacity-50 cursor-not-allowed'
                    }`}
                    title={timeline.length > 0 ? 'Play all animations' : 'Add some animations first'}
                >
                    Play Timeline
                </button>
            </div>
        </div>
    );
}
