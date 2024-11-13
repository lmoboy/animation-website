import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#4c1d95_0%,_transparent_25%)] opacity-30"></div>
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,_#4c1d95_0deg,_#701a75_120deg,_#4c1d95_240deg,_#701a75_360deg)] animate-[spin_20s_linear_infinite] opacity-30"></div>
                <div className="absolute inset-0 backdrop-blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <nav className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                    <NavLink href={route('animation.tool')} active={route().current('animation.tool')}>
                                        Tool
                                    </NavLink>
                                    <NavLink href={route('animation.featured')} active={route().current('animation.featured')}>
                                        Featured
                                    </NavLink>
                                    <NavLink href={route('animation.search')} active={route().current('animation.search')}>
                                        Search
                                    </NavLink>
                                    <NavLink href={route('animation.about')} active={route().current('animation.about')}>
                                        About
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-white/10 text-sm leading-4 font-medium rounded-md text-white/90 bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 hover:from-violet-900/20 hover:to-fuchsia-900/20 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
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
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 focus:outline-none focus:bg-white/5 focus:text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
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

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('animation.tool')} active={route().current('animation.tool')}>
                                Tool
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('animation.featured')} active={route().current('animation.featured')}>
                                Featured
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('animation.search')} active={route().current('animation.search')}>
                                Search
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('animation.about')} active={route().current('animation.about')}>
                                About
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-white/5">
                            <div className="px-4">
                                <div className="font-medium text-base text-white/90">{user.name}</div>
                                <div className="font-medium text-sm text-white/70">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl shadow border-b border-white/5">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
