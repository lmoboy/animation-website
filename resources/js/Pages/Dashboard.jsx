import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import anime from "animejs";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                        {/* Create Animation Card */}
                        <Link
                            href={route("create")}
                            className="dashboard-card group cursor-pointer bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800 overflow-hidden hover:bg-gray-800/80 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-purple-300"
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
                                    <h3 className="ml-4 text-xl font-semibold text-gray-200 group-hover:text-purple-300 transition-colors">
                                        Create Animation
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Start a new animation project and bring your
                                    ideas to life.
                                </p>
                            </div>
                        </Link>

                        {/* Browse Animations Card */}
                        <Link
                            href={route("explore")}
                            className="dashboard-card group cursor-pointer bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800 overflow-hidden hover:bg-gray-800/80 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-purple-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold text-gray-200 group-hover:text-purple-300 transition-colors">
                                        Browse Animations
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Discover amazing animations created by our
                                    community.
                                </p>
                            </div>
                        </Link>

                        {/* Community Card */}
                        <Link
                            href={route("search")}
                            className="dashboard-card group cursor-pointer bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800 overflow-hidden hover:bg-gray-800/80 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-purple-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold text-gray-200 group-hover:text-purple-300 transition-colors">
                                        Community Forum
                                    </h3>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Find specific animations or browse by
                                    category.
                                </p>
                            </div>
                        </Link>

                        {/* Profile Card */}
                        <Link
                            href={route("about")}
                            className="dashboard-card group cursor-pointer bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800 overflow-hidden hover:bg-gray-800/80 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg">
                                        <svg
                                            className="h-6 w-6 text-purple-300"
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
