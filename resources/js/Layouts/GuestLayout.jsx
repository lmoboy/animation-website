import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-gray-900 to-black">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#4c1d95_0%,_transparent_25%)] opacity-30"></div>
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,_#4c1d95_0deg,_#701a75_120deg,_#4c1d95_240deg,_#701a75_360deg)] animate-[spin_20s_linear_infinite] opacity-30"></div>
                <div className="absolute inset-0 backdrop-blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <Link href="/" className="flex items-center justify-center">
                    <ApplicationLogo className="w-20 h-20 text-white fill-current" />
                </Link>
            </div>

            <div className="relative z-10 w-full sm:max-w-md mt-6 px-6 py-4 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl shadow-xl border border-white/5 overflow-hidden sm:rounded-lg">
                {/* Glow Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-violet-500 to-transparent opacity-50"></div>
                    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
