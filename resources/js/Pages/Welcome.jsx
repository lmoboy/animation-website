import Background from "@/Components/Custom/Background";
import CardContainer from "@/Components/Custom/CardContainer";
import Waves from "@/Components/Custom/Waves";
import { useState, useEffect, useRef } from "react";
import { Link, Head } from "@inertiajs/react";
import anime from "animejs";

// Animation styles
const animationStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-20px) translateX(10px); }
    }
    @keyframes float-delay {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(20px) translateX(-10px); }
    }
    @keyframes float-alt {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-15px) translateX(-15px); }
    }
    @keyframes pulse-slow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
    @keyframes pulse-slow-delay {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-float-delay { animation: float-delay 9s ease-in-out infinite; }
    .animate-float-alt { animation: float-alt 10s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    .animate-pulse-slow-delay { animation: pulse-slow-delay 4s ease-in-out infinite 2s; }
`;

export default function Welcome({ auth }) {
    const [complete, setComplete] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const aboutRef = useRef(null);
    const techRef = useRef(null);
    const practicesRef = useRef(null);
    const ctaRef = useRef(null);
    const heroRef = useRef(null);

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
        if (!complete) return;

        anime({
            targets: ".header",
            easing: "easeOutExpo",
            opacity: [0, 1],
            duration: 1200,
            delay: 200,
        });

        anime({
            targets: heroRef.current,
            easing: "easeOutExpo",
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 1000,
            delay: 500,
        });

        anime({
            targets: ".about-card",
            easing: "easeOutExpo",
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200, { start: 800 }),
        });

        anime({
            targets: ".tech-card",
            easing: "easeOutExpo",
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(150, { start: 1200, from: "center" }),
        });

        anime({
            targets: ".practice-card",
            easing: "easeOutExpo",
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200, { start: 1500 }),
        });

        anime({
            targets: ctaRef.current,
            easing: "easeOutExpo",
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 1800,
        });

        anime({
            targets: ".bg-pattern",
            opacity: [0, 0.3],
            duration: 2000,
            easing: "easeOutExpo",
        });

        anime({
            targets: ".section-title",
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(300, { start: 800 }),
            easing: "easeOutExpo",
        });
    }, [complete]);

    return (
        <>
            <Head title="Welcome">
                <style>{animationStyles}</style>
            </Head>

            {complete ? (
                <>
                    <div className="exc bg-black min-h-screen relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="fixed inset-0 z-[1]">
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-gradient"></div>

                            {/* Animated Orbs */}
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-float"></div>
                            <div className="absolute top-1/2 left-2/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-float-delay"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-float-alt"></div>

                            {/* Grid Pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]"></div>

                            {/* Glow Effects */}
                            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-500/30 rounded-full filter blur-[100px] mix-blend-screen animate-pulse-slow"></div>
                            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-pink-500/30 rounded-full filter blur-[100px] mix-blend-screen animate-pulse-slow-delay"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-[2]">
                            <header
                                className={`header opacity-0 top-0 flex justify-end gap-2 py-10 bg-gradient-to-r w-full z-50 transition-transform duration-300`}
                            >
                                <nav className="flex flex-1 justify-end px-10 space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-lg px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-purple-300 font-semibold transform hover:scale-105 transition-all duration-300 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 focus:ring-offset-black"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-lg px-6 py-2.5 text-purple-300 font-semibold transform hover:scale-105 transition-all duration-300 hover:text-purple-400 focus:outline-none"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-lg px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-purple-300 font-semibold transform hover:scale-105 transition-all duration-300 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 focus:ring-offset-black"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </header>

                            {/* Hero Section */}
                            <section className="min-h-screen relative flex items-center justify-center py-20 px-4">
                                <div
                                    ref={heroRef}
                                    className="max-w-6xl mx-auto text-center relative opacity-0"
                                >
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-purple-300 text-transparent bg-clip-text">
                                        Create Stunning Animations
                                    </h1>
                                    <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
                                        Bring your ideas to life with our
                                        powerful animation tools
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <Link
                                            href={route("register")}
                                            className="rounded-lg px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-purple-300 font-semibold transform hover:scale-105 transition-all duration-300 hover:from-gray-900 hover:to-black"
                                        >
                                            Get Started
                                        </Link>
                                        <Link
                                            href="#about"
                                            className="rounded-lg px-8 py-3 bg-gray-900/50 text-purple-300 font-semibold transform hover:scale-105 transition-all duration-300"
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </section>

                            {/* About Section */}
                            <section
                                id="about"
                                className="py-20 px-4 relative"
                                ref={aboutRef}
                            >
                                <div className="max-w-6xl mx-auto relative">
                                    <h3 className="section-title text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-200 to-purple-300 text-transparent bg-clip-text opacity-0">
                                        About Us
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="about-card hover:from-gray-800 hover:to-gray-900 bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold mb-4 text-purple-300">
                                                Our Mission
                                            </h4>
                                            <p className="text-gray-400">
                                                To empower creators with
                                                powerful yet simple animation
                                                tools, making animation
                                                accessible to everyone.
                                            </p>
                                        </div>
                                        <div className="about-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold mb-4 text-purple-300">
                                                Our Vision
                                            </h4>
                                            <p className="text-gray-400">
                                                Building a vibrant community
                                                where creativity knows no bounds
                                                and animations bring ideas to
                                                life.
                                            </p>
                                        </div>
                                        <div className="about-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold mb-4 text-purple-300">
                                                Our Values
                                            </h4>
                                            <p className="text-gray-400">
                                                Innovation, creativity, and
                                                community-driven development are
                                                at the heart of everything we
                                                do.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Technologies Section */}
                            <section
                                ref={techRef}
                                className="py-20 px-4 relative"
                            >
                                <div className="absolute inset-0"></div>
                                <div className="max-w-6xl mx-auto relative">
                                    <h3 className="section-title text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-200 to-purple-300 text-transparent bg-clip-text opacity-0">
                                        Technologies We Use
                                    </h3>
                                    <div className="grid md:grid-cols-4 gap-6 text-center">
                                        <div className="tech-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-purple-300 mb-2">
                                                React
                                            </h4>
                                            <p className="text-gray-400">
                                                Modern UI development
                                            </p>
                                        </div>
                                        <div className="tech-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-purple-300 mb-2">
                                                Laravel
                                            </h4>
                                            <p className="text-gray-400">
                                                Robust backend framework
                                            </p>
                                        </div>
                                        <div className="tech-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-purple-300 mb-2">
                                                Anime.js
                                            </h4>
                                            <p className="text-gray-400">
                                                Powerful animations
                                            </p>
                                        </div>
                                        <div className="tech-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-purple-300 mb-2">
                                                Tailwind CSS
                                            </h4>
                                            <p className="text-gray-400">
                                                Modern styling
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Our Practices Section */}
                            <section
                                ref={practicesRef}
                                className="py-20 px-4 bg-gradient-to-r from-gray-900/10 to-gray-900/10 relative"
                            >
                                <div className="absolute inset-0 backdrop-blur-md"></div>
                                <div className="max-w-6xl mx-auto relative">
                                    <h3 className="section-title text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-200 to-purple-300 text-transparent bg-clip-text opacity-0">
                                        Our Best Practices
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="practice-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-purple-300">
                                                    Performance First
                                                </h4>
                                                <p className="text-gray-400">
                                                    Optimized animations and
                                                    efficient code execution for
                                                    smooth user experience
                                                </p>
                                            </div>
                                            <div className="practice-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-purple-300">
                                                    User-Centric Design
                                                </h4>
                                                <p className="text-gray-400">
                                                    Intuitive interfaces and
                                                    workflows designed with
                                                    users in mind
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="practice-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-purple-300">
                                                    Community Driven
                                                </h4>
                                                <p className="text-gray-400">
                                                    Regular updates and features
                                                    based on community feedback
                                                    and needs
                                                </p>
                                            </div>
                                            <div className="practice-card bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg backdrop-blur-md border border-gray-800 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-purple-300">
                                                    Security First
                                                </h4>
                                                <p className="text-gray-400">
                                                    Implementation of best
                                                    security practices to
                                                    protect user data and
                                                    content
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Call to Action */}
                            <section className="py-20 px-4 relative">
                                <div className="absolute inset-0"></div>
                                <div
                                    ref={ctaRef}
                                    className="max-w-4xl mx-auto text-center relative opacity-0"
                                >
                                    <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-purple-300 text-transparent bg-clip-text">
                                        Ready to Start Creating?
                                    </h3>
                                    <p className="text-gray-400 mb-8 text-lg">
                                        Join our community and start bringing
                                        your ideas to life with amazing
                                        animations!
                                    </p>
                                    <Link
                                        href={route("register")}
                                        className="inline-block rounded-lg px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-purple-300 font-semibold transform hover:scale-105 transition-all duration-300 hover:from-gray-900 hover:to-black"
                                    >
                                        Get Started Now
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-8xl bg-black text-white font-bold flex items-center justify-center h-screen relative">
                    <div className="fixed inset-0 z-[1]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,128,0.1),rgba(255,0,255,0.05))]"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.9),rgba(0,0,0,0.7))]"></div>
                        <div className="absolute inset-0">
                            <div className="bg-pattern h-full w-full opacity-0"></div>
                        </div>
                    </div>
                    <div className="intro text-center relative z-[2]">
                        <h1 className="text-shadow bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                            Welcome
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
}
