import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-black">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900"></div>
                
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-xl opacity-20"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-xl opacity-20"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>

            {/* Navigation */}
            <nav className="w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="transform hover:scale-105 transition-transform duration-300">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-purple-300" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-300 hover:text-white"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("explore")}
                                    active={route().current("explore")}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-300 hover:text-white"
                                >
                                    Explore
                                </NavLink>
                                <NavLink
                                    href={route("create")}
                                    active={route().current("create")}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg transform hover:scale-105 transition-all duration-300 mt-2"
                                >
                                    Create
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-700 text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-800 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-300 hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition duration-150 ease-in-out"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-300 hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition duration-150 ease-in-out"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-gray-200 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out focus:outline-none"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("explore")}
                            active={route().current("explore")}
                            className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out focus:outline-none"
                        >
                            Explore
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("create")}
                            active={route().current("create")}
                            className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out focus:outline-none"
                        >
                            Create
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-800">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-400">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("profile.edit")}
                                className="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:border-gray-700 focus:outline-none transition duration-150 ease-in-out"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                className="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:border-gray-700 focus:outline-none transition duration-150 ease-in-out"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-gray-900/50 backdrop-blur-sm shadow border-b border-gray-800">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="relative z-10">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-xl sm:rounded-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
