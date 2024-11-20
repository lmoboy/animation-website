import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-black">
            <div className="fixed inset-0 z-0">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-xl opacity-20"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-xl opacity-20"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>

            <div className="relative z-10 font-sans text-gray-200 antialiased">
                <div className="absolute top-6 left-6">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-purple-300" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
