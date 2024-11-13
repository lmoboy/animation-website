import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AnimationContainer from "@/Components/Custom/AnimationContainer";
import { format } from "date-fns";

export default function Show({ auth, animation }) {
    const [isObtaining, setIsObtaining] = useState(false);

    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
    };

    const handleObtain = async () => {
        setIsObtaining(true);
        try {
            const response = await fetch(`/api/animation/${animation.param_ref}`);
            const data = await response.json();
            
            // Create a Blob from the animation parameters
            const blob = new Blob([data[0]], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            
            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `animation-${animation.name.toLowerCase().replace(/\s+/g, '-')}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error obtaining animation:', error);
        } finally {
            setIsObtaining(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white/90 leading-tight">
                    Animation Details
                </h2>
            }
        >
            <Head title={`${animation.name} - Animation Details`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl overflow-hidden shadow-xl sm:rounded-lg border border-white/5">
                        {/* Animation Preview */}
                        <div className="max-w-3xl mx-auto p-6">
                            <AnimationContainer data={animation} />
                        </div>

                        {/* Animation Details */}
                        <div className="border-t border-white/10">
                            <div className="max-w-3xl mx-auto p-6 space-y-8">
                                {/* Title and Description */}
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                        {animation.name}
                                    </h1>
                                    <p className="mt-4 text-white/70 leading-relaxed">
                                        {animation.description || "No description available."}
                                    </p>
                                </div>

                                {/* Metadata */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <h3 className="text-sm font-medium text-fuchsia-400">Created</h3>
                                        <p className="mt-2 text-white/90">
                                            {formatDate(animation.created_at)}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <h3 className="text-sm font-medium text-violet-400">Last Updated</h3>
                                        <p className="mt-2 text-white/90">
                                            {formatDate(animation.updated_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
                                    <div className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 rounded-lg p-4 border border-white/5">
                                        <dt className="text-sm font-medium text-violet-400">Views</dt>
                                        <dd className="mt-1 text-2xl font-semibold text-white/90">
                                            {animation.views || 0}
                                        </dd>
                                    </div>
                                    <div className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 rounded-lg p-4 border border-white/5">
                                        <dt className="text-sm font-medium text-fuchsia-400">Likes</dt>
                                        <dd className="mt-1 text-2xl font-semibold text-white/90">
                                            {animation.likes || 0}
                                        </dd>
                                    </div>
                                    <div className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 rounded-lg p-4 border border-white/5">
                                        <dt className="text-sm font-medium text-violet-400">Downloads</dt>
                                        <dd className="mt-1 text-2xl font-semibold text-white/90">
                                            {animation.downloads || 0}
                                        </dd>
                                    </div>
                                    <div className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 rounded-lg p-4 border border-white/5">
                                        <dt className="text-sm font-medium text-fuchsia-400">Comments</dt>
                                        <dd className="mt-1 text-2xl font-semibold text-white/90">
                                            {animation.comments || 0}
                                        </dd>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleObtain}
                                        disabled={isObtaining}
                                        className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg
                                                 hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500
                                                 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50
                                                 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-fuchsia-500/25"
                                    >
                                        {isObtaining ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Obtaining...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Obtain Animation
                                            </>
                                        )}
                                    </button>

                                    <button
                                        className="flex items-center px-4 py-2 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 text-white rounded-lg
                                                 hover:from-violet-900/30 hover:to-fuchsia-900/30 focus:outline-none focus:ring-2 focus:ring-white/20
                                                 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 border border-white/5"
                                    >
                                        <svg className="w-5 h-5 mr-2 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Like
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
