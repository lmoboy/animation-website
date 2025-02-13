import React from 'react';
import { BezierCurveEditor } from 'react-bezier-curve-editor';
import './bezier-editor.css'; // Custom styling

export default function BezierEditor({ value = [0.4, 0, 1, 0.6], onChange }) {
  return (
    <div className="bezier-editor-container bg-gray-900 p-4 rounded-lg">
      <BezierCurveEditor
        size={200}
        outerAreaSize={40}
        strokeWidth={3}
        value={value}
        onChange={onChange}
        curveLineColor="#a855f7"
        startHandleColor="#f59e0b"
        endHandleColor="#3b82f6"
        handleLineColor="#4b5563"
        innerAreaColor="#1f2937"
        outerAreaColor="#111827"
        rowColor="#374151"
        fixedHandleColor="#6b7280"
      />
    </div>
  );
}