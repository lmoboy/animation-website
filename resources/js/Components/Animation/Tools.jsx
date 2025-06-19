import React, { useEffect } from "react";
import { tools } from "@/Data/tools";
import anime from "animejs";
import CodeEditor from "./CodeEditor"; // You'll need to create/import this component
import BezierEditor from "./BezierEditor"; // You'll need to create/import this component

export default function Tools({
    activeCategory,
    selectedTool,
    toolSettings,
    onCategoryClick,
    onToolClick,
    onSettingsChange,
    appliedTools = {},
}) {
    useEffect(() => {
        if (selectedTool) {
            anime({
                targets: ".tool-setting",
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 400,
                easing: "easeOutCubic",
                delay: anime.stagger(100),
            });
        }
    }, [selectedTool]);

    const renderSettingInput = (setting) => {
        switch (setting.type) {
            case "select":
                return (
                    <select
                        value={toolSettings[setting.name] ?? setting.default}
                        onChange={(e) =>
                            handleSettingChange(setting, e.target.value)
                        }
                        className="w-full bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-purple-500"
                    >
                        {setting.options.map((option) =>
                            typeof option === "object" ? (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ) : (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            )
                        )}
                    </select>
                );

            case "toggle":
                return (
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={
                                toolSettings[setting.name] ?? setting.default
                            }
                            onChange={(e) =>
                                handleSettingChange(setting, e.target.checked)
                            }
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-purple-500 peer-focus:ring-2 peer-focus:ring-purple-800 transition-colors">
                            <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </div>
                    </label>
                );

            case "color":
                return (
                    <input
                        type="color"
                        value={toolSettings[setting.name] ?? setting.default}
                        onChange={(e) =>
                            handleSettingChange(setting, e.target.value)
                        }
                        className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
                    />
                );

            case "bezier":
                return (
                    <BezierEditor
                        value={toolSettings[setting.name] ?? setting.default}
                        onChange={(value) =>
                            handleSettingChange(setting, value)
                        }
                    />
                );

            case "code":
                return (
                    <CodeEditor
                        language={setting.language}
                        value={toolSettings[setting.name] ?? ""}
                        onChange={(value) =>
                            handleSettingChange(setting, value)
                        }
                    />
                );

            case "group":
                return (
                    <div className="ml-4 space-y-4 border-l-2 border-gray-800 pl-4">
                        {setting.settings.map((nestedSetting) => (
                            <div
                                key={nestedSetting.name}
                                className="tool-setting opacity-0"
                            >
                                {renderSettingLabel(nestedSetting)}
                                {renderSettingInput(nestedSetting)}
                            </div>
                        ))}
                    </div>
                );

            case "grid":
                return (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={
                                toolSettings[setting.name]?.[0] ??
                                setting.default[0]
                            }
                            onChange={(e) =>
                                handleGridChange(setting, 0, e.target.value)
                            }
                            className="w-16 bg-gray-800 text-gray-300 rounded-lg px-2 py-1 border border-gray-700"
                        />
                        <span className="text-gray-400 self-center">×</span>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={
                                toolSettings[setting.name]?.[1] ??
                                setting.default[1]
                            }
                            onChange={(e) =>
                                handleGridChange(setting, 1, e.target.value)
                            }
                            className="w-16 bg-gray-800 text-gray-300 rounded-lg px-2 py-1 border border-gray-700"
                        />
                    </div>
                );

            default:
                return (
                    <div className="relative mt-2">
                        <div className="h-2 bg-gray-800 rounded-full">
                            <div
                                className="absolute h-2 bg-purple-500 rounded-full"
                                style={{
                                    width: `${
                                        ((toolSettings[setting.name] -
                                            setting.min) /
                                            (setting.max - setting.min)) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>
                        <input
                            type="range"
                            min={setting.min}
                            max={setting.max}
                            step={setting.step || 1}
                            value={
                                toolSettings[setting.name] ?? setting.default
                            }
                            onChange={(e) =>
                                handleSettingChange(
                                    setting,
                                    parseFloat(e.target.value)
                                )
                            }
                            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                        />
                    </div>
                );
        }
    };

    const handleSettingChange = (setting, value) => {
        onSettingsChange({
            ...toolSettings,
            [setting.name]: value,
        });
    };

    const handleGridChange = (setting, index, value) => {
        const newValue = [...(toolSettings[setting.name] || setting.default)];
        newValue[index] = parseInt(value);
        onSettingsChange({
            ...toolSettings,
            [setting.name]: newValue,
        });
    };

    const renderSettingLabel = (setting) => (
        <label className="block text-sm font-medium text-gray-300 mb-1">
            {setting.name}
            {setting.unit && (
                <span className="text-gray-500 ml-1">({setting.unit})</span>
            )}
        </label>
    );

    return (
        <div className="w-full sm:w-64 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 overflow-y-auto max-h-[400px] sm:max-h-none">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-300 mb-4">
                Animation Tools
            </h2>

            <div className="space-y-4">
                {Object.entries(tools).map(([category, { title, tabs }]) => (
                    <div key={category} className="space-y-2">
                        <button
                            onClick={() => onCategoryClick(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                activeCategory === category
                                    ? "bg-purple-500/20 text-purple-300"
                                    : "text-gray-400 hover:bg-gray-800/50"
                            }`}
                        >
                            {title}
                        </button>

                        {activeCategory === category && (
                            <div className="pl-4 space-y-2">
                                {tabs.map((tool) => (
                                    <button
                                        key={tool.name}
                                        onClick={() => onToolClick(tool)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                            selectedTool?.name === tool.name
                                                ? "bg-purple-500/10 text-purple-300"
                                                : "text-gray-400 hover:bg-gray-800/50"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {tool.name}
                                                </div>
                                                {tool.description && (
                                                    <div className="text-xs opacity-60">
                                                        {tool.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedTool?.settings && (
                <div className="mt-6 space-y-4 border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-medium text-purple-300">
                        {selectedTool.name} Settings
                    </h3>
                    <div className="space-y-4">
                        {selectedTool.settings.map((setting) => (
                            <div
                                key={setting.name}
                                className="tool-setting opacity-0"
                            >
                                {renderSettingLabel(setting)}
                                {renderSettingInput(setting)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
