import React from 'react';

export default function Preview({ cubeRef }) {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8">
            <div className="relative w-full h-96 bg-gray-800/50 rounded-lg overflow-hidden">
                <div
                    ref={cubeRef}
                    id="anim_cube"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500/80 rounded-lg shadow-lg"
                ></div>
            </div>
        </div>
    );
}
