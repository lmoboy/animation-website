import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="absolute top-6 z-20">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-purple-400" />
                    </Link>
                </div>

                <div className="relative w-full sm:max-w-md px-6">
                    {children}
                </div>
            </div>
        </>
    );
}
