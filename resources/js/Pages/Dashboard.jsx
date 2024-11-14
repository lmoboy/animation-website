import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import anime from "animejs";

export default function Dashboard({ auth }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                        {/* Create Animation Card */}
                        <Link
                            href={route("animation.create")}
                            className="dashboard-card group cursor-pointer bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                        Create Animation
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Start a new animation project and bring your
                                    ideas to life.
                                </p>
                            </div>
                        </Link>

                        {/* Explore Card */}
                        <Link
                            href={route("animation.explore")}
                            className="dashboard-card group cursor-pointer bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                        Explore
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Discover amazing animations created by our
                                    community.
                                </p>
                            </div>
                        </Link>

                        {/* Search Card */}
                        <Link
                            href={route("animation.search")}
                            className="dashboard-card group cursor-pointer bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                        Search
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Find specific animations or browse by
                                    category.
                                </p>
                            </div>
                        </Link>

                        {/* About Us Card */}
                        <Link
                            href={route("about")}
                            className="dashboard-card group cursor-pointer bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                        About Us
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Learn more about our team and the story behind our animation platform.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
