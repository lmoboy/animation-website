import React, { useEffect } from 'react';
import { tools } from '@/Data/tools';
import anime from 'animejs';

// Tools component: Manages the UI for all animation tools and their settings
export default function Tools({ activeCategory, selectedTool, toolSettings, onCategoryClick, onToolClick, onSettingsChange, appliedTools = {} }) {
    // Animate settings when they appear for smooth UI transitions
    useEffect(() => {
        if (selectedTool) {
            anime({
                targets: '.tool-setting',
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutCubic',
                delay: anime.stagger(100) // Stagger effect for multiple settings
            });
        }
    }, [selectedTool]);

    return (
        <div className="w-64 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Animation Tools</h2>
            
            {/* Navigation breadcrumb showing current tool path */}
            <div className="text-sm text-gray-400 mb-4">
                <span className="text-purple-300">/</span>
                {activeCategory && (
                    <>
                        <span>{tools[activeCategory].title}</span>
                        {selectedTool && (
                            <>
                                <span className="text-purple-300">/</span>
                                <span>{selectedTool.name}</span>
                            </>
                        )}
                    </>
                )}
            </div>
            
            {/* Tool Categories and their tools */}
            <div className="space-y-4">
                {Object.entries(tools).map(([category, { title, tabs }]) => (
                    <div key={category} className="space-y-2">
                        {/* Category button */}
                        <button
                            onClick={() => onCategoryClick(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                activeCategory === category
                                    ? 'bg-purple-500/20 text-purple-300'
                                    : 'text-gray-400 hover:bg-gray-800/50'
                            }`}
                        >
                            {title}
                        </button>
                        
                        {/* Tool buttons within active category */}
                        {activeCategory === category && (
                            <div className="pl-4 space-y-2">
                                {tabs.map((tool) => (
                                    <button
                                        key={tool.name}
                                        onClick={() => {
                                            if (category === 'easing') {
                                                // Special handling for easing tools as toggles
                                                const newSettings = { ...toolSettings };
                                                // Remove any existing easing
                                                ['linear', 'easeInOut', 'easeIn', 'easeOut'].forEach(key => {
                                                    delete newSettings[key];
                                                });
                                                // Toggle the easing on/off
                                                newSettings[tool.name] = true;
                                                onSettingsChange(newSettings);
                                            } else {
                                                // Regular tools show their settings panel
                                                onToolClick(tool);
                                            }
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                            category === 'easing' 
                                                ? toolSettings[tool.name]
                                                    ? 'bg-purple-500/20 text-purple-300'
                                                    : 'text-gray-400 hover:bg-gray-800/50'
                                                : selectedTool?.name === tool.name
                                                    ? 'bg-purple-500/10 text-purple-300'
                                                    : 'text-gray-400 hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm font-medium">{tool.name}</div>
                                                <div className="text-xs opacity-60">{tool.description}</div>
                                            </div>
                                            {appliedTools[tool.name] && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newSettings = { ...toolSettings };
                                                        delete newSettings[tool.name];
                                                        onSettingsChange(newSettings);
                                                    }}
                                                    className="text-gray-400 hover:text-red-400 p-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Settings panel for the selected tool */}
            {selectedTool?.settings && (
                <div className="mt-6 space-y-4 border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-medium text-purple-300">Settings</h3>
                    <div className="space-y-4">
                        {selectedTool.settings.map((setting) => (
                            <div key={setting.name} className="tool-setting opacity-0">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    {setting.name}
                                    {setting.unit && (
                                        <span className="text-gray-500 ml-1">({setting.unit})</span>
                                    )}
                                </label>
                                {setting.type === 'select' ? (
                                    <select
                                        value={toolSettings[selectedTool.name]?.[setting.name] || setting.default}
                                        onChange={(e) => {
                                            onSettingsChange({
                                                ...toolSettings,
                                                [selectedTool.name]: {
                                                    ...toolSettings[selectedTool.name],
                                                    [setting.name]: e.target.value
                                                }
                                            });
                                        }}
                                        className="w-full bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-purple-500"
                                    >
                                        {setting.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <>
                                        <input
                                            type={setting.type}
                                            min={setting.min}
                                            max={setting.max}
                                            step={setting.step || 1}
                                            value={toolSettings[selectedTool.name]?.[setting.name] || setting.default}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                onSettingsChange({
                                                    ...toolSettings,
                                                    [selectedTool.name]: {
                                                        ...toolSettings[selectedTool.name],
                                                        [setting.name]: value
                                                    }
                                                });
                                            }}
                                            className="w-full bg-gray-800 rounded-lg h-2 appearance-none cursor-pointer
                                                [&::-webkit-slider-thumb]:appearance-none 
                                                [&::-webkit-slider-thumb]:w-4 
                                                [&::-webkit-slider-thumb]:h-4 
                                                [&::-webkit-slider-thumb]:rounded-full 
                                                [&::-webkit-slider-thumb]:bg-purple-500
                                                [&::-webkit-slider-thumb]:hover:bg-purple-400
                                                [&::-webkit-slider-thumb]:transition-colors"
                                        />
                                        {/* Value display */}
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>{setting.min}{setting.unit}</span>
                                            <span>{toolSettings[selectedTool.name]?.[setting.name] || setting.default}{setting.unit}</span>
                                            <span>{setting.max}{setting.unit}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
