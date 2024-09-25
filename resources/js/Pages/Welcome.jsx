import CardContainer from "@/Components/CardContainer";
import { Link, Head } from "@inertiajs/react";
import anime from "animejs";
export default function Welcome({ auth }) {


    return (
        <>
            <Head title="Welcome" />

            <div className="exc bg-black dark:text-white/50 h-screen">
                <header className="header top-0 flex justify-end gap-2 py-10">
                    <nav className=" flex flex-1 justify-center">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#ff261b] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <CardContainer
                    className="w-fit m-10 px-10 bg-gray-600 round-md hover:scale-105 transition-all duration-300"
                >
                    <main className="py-10">
                        Welcome to the BEST animation website you could've ever
                        wanted!
                        <div className="w-full justify-end">
                            Want something specific? Create your own animations
                            with our simple animation tool!
                        </div>
                    </main>
                </CardContainer>
            </div>
        </>
    );
}
