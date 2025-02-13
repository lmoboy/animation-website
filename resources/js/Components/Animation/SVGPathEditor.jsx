import React, { useState, useCallback } from 'react';
import Path, { Svg } from 'react-svg-path';

export default function SVGPathEditor({ initialPath = 'M0 0', onChange }) {
  const [path, setPath] = useState(() => new Path(initialPath));
  const [inputValue, setInputValue] = useState(initialPath);
  const [isValid, setIsValid] = useState(true);

  const handlePathChange = useCallback((newPath) => {
    setPath(newPath);
    setInputValue(newPath.toString());
    onChange?.(newPath.toString());
    setIsValid(true);
  }, [onChange]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    try {
      const newPath = new Path(value);
      setPath(newPath);
      onChange?.(value);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      console.error('Invalid SVG path:', error);
    }
  };

  return (
    <div className="svg-path-editor-container bg-gray-900 p-4 rounded-lg border border-gray-700">
      <div className="mb-4 relative">
        <PathEditor
          path={path}
          onChange={handlePathChange}
          width={400}
          height={300}
          gridSize={20}
          className="border border-gray-700 rounded-lg overflow-hidden"
          pathProps={{
            stroke: '#a855f7',
            strokeWidth: 2,
            fill: 'none'
          }}
          controlProps={{
            stroke: '#3b82f6',
            fill: '#1f2937'
          }}
          gridProps={{
            stroke: '#374151',
            strokeWidth: 0.5
          }}
        />
      </div>

      <div className="space-y-4">
        <div className="text-sm font-medium text-purple-300">
          SVG Path Data
        </div>
        <div className="relative">
          <textarea
            className={`w-full bg-gray-800 text-gray-100 rounded-lg p-3 font-mono text-sm border ${
              isValid ? 'border-gray-700' : 'border-red-500'
            } focus:border-purple-500 focus:ring-1 focus:ring-purple-500`}
            value={inputValue}
            onChange={handleTextChange}
            rows={3}
            placeholder="M0 0 L100 100..."
          />
          {!isValid && (
            <div className="absolute bottom-2 right-2 text-red-400 text-xs">
              Invalid path syntax
            </div>
          )}
        </div>

        <div className="text-sm text-gray-400">
          <p className="mb-2">Supported commands:</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <code>M/m</code>
            <code>L/l</code>
            <code>H/h</code>
            <code>V/v</code>
            <code>C/c</code>
            <code>S/s</code>
            <code>Q/q</code>
            <code>T/t</code>
            <code>A/a</code>
            <code>Z/z</code>
          </div>
        </div>
      </div>
    </div>
  );
}