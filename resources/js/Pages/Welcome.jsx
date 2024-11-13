import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black">
                {/* Animated Background */}
                <div className="fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#4c1d95_0%,_transparent_25%)] opacity-30"></div>
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,_#4c1d95_0deg,_#701a75_120deg,_#4c1d95_240deg,_#701a75_360deg)] animate-[spin_20s_linear_infinite] opacity-30"></div>
                    <div className="absolute inset-0 backdrop-blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    {/* Navigation */}
                    <div className="fixed top-0 right-0 p-6 text-right">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-white/70 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-violet-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-white/70 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-violet-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ml-4 font-semibold text-white/70 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-violet-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center min-h-screen p-6">
                        <div className="text-center">
                            <ApplicationLogo className="w-24 h-24 text-white fill-current mx-auto mb-8" />
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                                Kolhoz Animations
                            </h1>
                            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
                                Unleash your creativity with our cutting-edge animation platform.
                                Perfect for developers, designers, and creators who want to bring their ideas to life.
                            </p>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                                {[
                                    {
                                        title: "Intuitive Tools",
                                        description: "Create animations with our easy-to-use visual editor",
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: "Community Driven",
                                        description: "Share and discover animations from other creators",
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: "Modern Tech",
                                        description: "Built with the latest web technologies",
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    }
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 backdrop-blur-xl rounded-lg p-6 border border-white/5"
                                    >
                                        <div className="h-12 w-12 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 rounded-lg flex items-center justify-center mb-4 text-fuchsia-400 mx-auto">
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

                            {/* CTA Button */}
                            <Link
                                href={route('register')}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg
                                         hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500
                                         focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 shadow-lg shadow-fuchsia-500/25
                                         text-lg font-semibold"
                            >
                                Get Started
                                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
