import { Link, Head } from "@inertiajs/react";
import anime from "animejs";
export default function Welcome({ auth }) {
    anime({
        targets: [".welcome", ".header"],
        translateX: [-100, 0],
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: anime.stagger(500, { start: 100 }),
    });

    anime.timeline({
        targets: ".exc",
        duration: 1000,
        easing: 'easeInOutQuad',
        direction: "alternate",
        loop: true,
    }).add({
        background: 'linear-gradient(to bottom right, rgb(100, 217, 136), rgb(255, 186, 8))'
    }).add({
        background: 'linear-gradient(to bottom right, rgb(255, 186, 8), rgb(100, 217, 136))'
    }).add({
        background: 'linear-gradient(to bottom right, rgb(0, 184, 230), rgb(255, 234, 167))'
    }).add({
        background: 'linear-gradient(to bottom right, rgb(255, 234, 167), rgb(0, 184, 230))'
    })

    return (
        <>
            <Head title="Welcome" />
            <div className="exc  dark:text-white/50">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="z-10 relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="header sticky top-0 flex justify-end gap-2 py-10">
                            <nav className="-mx-3 flex flex-1 justify-center">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
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
                        <main className="welcome py-10">
                            Welcome to the BEST animation website you could've
                            ever wanted!
                            <div className="w-full justify-end">
                                Want something specific? Create your own
                                animations with our simple animation tool!
                            </div>
                        </main>
                        <div className="p-10 w-10 "></div>
                    </div>
                </div>
            </div>
        </>
    );
}
