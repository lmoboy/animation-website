import Background from "@/Components/Custom/Background";
import CardContainer from "@/Components/Custom/CardContainer";
import Waves from "@/Components/Custom/Waves";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import anime from "animejs";
export default function Welcome({ auth }) {
    const [complete, setComplete] = useState(false);
    useEffect(() => {
        if (auth.user) setComplete(true);

        anime({
            targets: ".intro h1",
            easing: "easeInOutSine",
            direction: "alternate",
            opacity: [0, 1],
            translateY: [100, 50],
            duration: 1500,
            complete: () => {
                setComplete(true);
            },
        });
    }, []);

    useEffect(() => {
        anime({
            targets: [".exc .header"],
            easing: "easeInOutSine",
            opacity: [0, 1],
            translateY: [-100, 0],
            duration: 1500,
        });
    }, [complete]);

    return (
        <>
            <Head title="Welcome" />

            {complete ? (
                <>
                    <Background />
                    <Waves />
                    <div className="exc bg-gradient-to-br from-slate-900 to-slate-800 dark:text-white/50 h-screen z-2">
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
                            className="w-fit opacity-0 m-10 
             border-2 border-gray-600 bg-opacity-20
            px-10 bg-gray-600 round-md hover:scale-105 hover:bg-opacity-40 transition-all z-[3]"
                        >
                            <main className="py-5">
                                Welcome to the BEST animation website you
                                could've ever wanted!
                                <div className="w-full justify-end">
                                    Want something specific? Create your own
                                    animations with our simple animation tool!
                                </div>
                            </main>
                        </CardContainer>
                    </div>
                </>
            ) : (
                <div className=" text-8xl bg-gradient-to-br from-slate-900 to-slate-800 dark:text-white/50 font-bold flex items-center justify-center h-screen">
                    <div className="intro text-center">
                        <h1 className="text-shadow">Welcome</h1>
                    </div>
                </div>
            )}
        </>
    );
}
