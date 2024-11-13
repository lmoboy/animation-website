import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function About({ auth }) {
    const features = [
        {
            title: "Create Animations",
            description: "Design and customize animations with our intuitive animation tool.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            )
        },
        {
            title: "Share & Discover",
            description: "Share your animations with the community and discover creations from others.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            )
        },
        {
            title: "Easy Integration",
            description: "Export animations in multiple formats for easy integration into your projects.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white/90 leading-tight">
                    About
                </h2>
            }
        >
            <Head title="About" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl overflow-hidden shadow-xl sm:rounded-lg border border-white/5">
                        {/* Hero Section */}
                        <div className="px-6 py-12 sm:px-12 text-center">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                                Welcome to Kolhoz Animations
                            </h1>
                            <p className="text-lg text-white/70 max-w-3xl mx-auto">
                                Your platform for creating, sharing, and discovering cutting-edge animations.
                                Built with modern web technologies to empower creators and developers alike.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="border-t border-white/10">
                            <div className="max-w-5xl mx-auto px-6 py-12 sm:px-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 rounded-lg p-6 border border-white/5"
                                        >
                                            <div className="h-12 w-12 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 rounded-lg flex items-center justify-center mb-4 text-fuchsia-400">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white/90 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-white/70">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Technology Stack */}
                        <div className="border-t border-white/10">
                            <div className="max-w-5xl mx-auto px-6 py-12 sm:px-12">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-8 text-center">
                                    Built with Modern Technologies
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    {["Laravel", "React", "Tailwind CSS", "Anime.js"].map((tech, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 rounded-lg p-4 text-center border border-white/5"
                                        >
                                            <span className="text-white/90">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
