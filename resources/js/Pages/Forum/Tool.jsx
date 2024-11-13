import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Tool({ auth }) {
    const [animation, setAnimation] = useState({
        direction: "normal",
        duration: 1000,
        translateX: 250,
        translateY: 0,
        easing: "easeInOutQuad",
        loop: true,
        rotate: 0
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white/90 leading-tight">
                    Animation Tool
                </h2>
            }
        >
            <Head title="Animation Tool" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl overflow-hidden shadow-xl sm:rounded-lg border border-white/5">
                        <div className="p-6">
                            {/* Preview Area */}
                            <div className="relative aspect-video w-full bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 backdrop-blur-xl rounded-lg overflow-hidden border border-white/5 mb-8">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-sm shadow-lg shadow-fuchsia-500/25"></div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Animation Parameters */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                                            Animation Parameters
                                        </h3>
                                        {/* Parameter controls will go here */}
                                    </div>
                                </div>

                                {/* Timeline & Controls */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                                            Timeline & Controls
                                        </h3>
                                        {/* Timeline controls will go here */}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex gap-4">
                                <button
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg
                                             hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500
                                             focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 shadow-lg shadow-fuchsia-500/25"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    </svg>
                                    Preview Animation
                                </button>

                                <button
                                    className="flex items-center px-4 py-2 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 text-white rounded-lg
                                             hover:from-violet-900/30 hover:to-fuchsia-900/30 focus:outline-none focus:ring-2 focus:ring-white/20
                                             focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 border border-white/5"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    Save Animation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
