import ApplicationLogo from "@/Components/ApplicationLogo";
import Waves from "@/Components/Custom/Waves";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-800">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 text-gray-500" />
                    </Link>
                </div>

                <div className="w-full z-10  sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <Waves />
        </>
    );
}
