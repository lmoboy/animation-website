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

    // Mouse position handler
    useEffect(() => {
        const handleMouseMove = (e) => {
            const threshold = 100; // Show nav when mouse is within 100px of top
            setShowNav(e.clientY <= threshold);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

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
            targets: ".header",
            easing: "easeInQuad",
            translateY: showNav ? 0 : -100,
            opacity: showNav ? 1 : 0,
            duration: 300,
        });
    }, [showNav]);

    useEffect(() => {
        if (!complete) return;

        anime({
            targets: ".header",
            easing: "easeOutExpo",
            translateY: [-100, 0],
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
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 animate-gradient"></div>

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
                                className={`header opacity-0 top-0 flex justify-end gap-2 py-10 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md fixed w-full z-50 transition-transform duration-300 ${
                                    showNav
                                        ? "translate-y-0"
                                        : "-translate-y-full"
                                }`}
                            >
                                <nav className="flex flex-1 justify-center space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-lg px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-lg px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-lg px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </header>

                            {/* Hero Section */}
                            <section className="pt-32 pb-16 px-4">
                                <div ref={heroRef} className="opacity-0">
                                    <CardContainer
                                        className="max-w-4xl mx-auto p-8
                                        border border-white/10 bg-gradient-to-br from-white/10 to-white/5
                                        rounded-xl hover:scale-105 hover:from-white/15 hover:to-white/10 
                                        transition-all duration-500 backdrop-blur-md shadow-2xl"
                                    >
                                        <main className="text-center text-white">
                                            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                                Welcome to the BEST Animation
                                                Platform
                                            </h2>
                                            <div className="text-xl text-gray-300 mt-4">
                                                Create, share, and explore
                                                stunning animations with our
                                                intuitive tools
                                            </div>
                                        </main>
                                    </CardContainer>
                                </div>
                            </section>

                            {/* About Us Section */}
                            <section
                                ref={aboutRef}
                                className="py-16 px-4 bg-gradient-to-r from-purple-900/10 to-pink-900/10 relative"
                            >
                                <div className="absolute inset-0 backdrop-blur-md"></div>
                                <div className="max-w-6xl mx-auto relative">
                                    <h3 className="section-title text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text opacity-0">
                                        About Us
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="about-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold mb-4 text-purple-400">
                                                Our Mission
                                            </h4>
                                            <p className="text-gray-300">
                                                To empower creators with
                                                powerful yet simple animation
                                                tools, making animation
                                                accessible to everyone.
                                            </p>
                                        </div>
                                        <div className="about-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold mb-4 text-pink-400">
                                                Our Vision
                                            </h4>
                                            <p className="text-gray-300">
                                                Building a vibrant community
                                                where creativity knows no bounds
                                                and animations bring ideas to
                                                life.
                                            </p>
                                        </div>
                                        <div className="about-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold mb-4 text-purple-400">
                                                Our Values
                                            </h4>
                                            <p className="text-gray-300">
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
                                className="py-16 px-4 relative"
                            >
                                <div className="absolute inset-0"></div>
                                <div className="max-w-6xl mx-auto relative">
                                    <h3 className="section-title text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text opacity-0">
                                        Technologies We Use
                                    </h3>
                                    <div className="grid md:grid-cols-4 gap-6 text-center">
                                        <div className="tech-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-purple-400 mb-2">
                                                React
                                            </h4>
                                            <p className="text-gray-300">
                                                Modern UI development
                                            </p>
                                        </div>
                                        <div className="tech-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-pink-400 mb-2">
                                                Laravel
                                            </h4>
                                            <p className="text-gray-300">
                                                Robust backend framework
                                            </p>
                                        </div>
                                        <div className="tech-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-purple-400 mb-2">
                                                Anime.js
                                            </h4>
                                            <p className="text-gray-300">
                                                Powerful animations
                                            </p>
                                        </div>
                                        <div className="tech-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                            <h4 className="text-xl font-semibold text-pink-400 mb-2">
                                                Tailwind CSS
                                            </h4>
                                            <p className="text-gray-300">
                                                Modern styling
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Our Practices Section */}
                            <section
                                ref={practicesRef}
                                className="py-16 px-4 bg-gradient-to-r from-purple-900/10 to-pink-900/10 relative"
                            >
                                <div className="absolute inset-0 backdrop-blur-md"></div>
                                <div className="max-w-6xl mx-auto relative">
                                    <h3 className="section-title text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text opacity-0">
                                        Our Best Practices
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="practice-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-purple-400">
                                                    Performance First
                                                </h4>
                                                <p className="text-gray-300">
                                                    Optimized animations and
                                                    efficient code execution for
                                                    smooth user experience
                                                </p>
                                            </div>
                                            <div className="practice-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-pink-400">
                                                    User-Centric Design
                                                </h4>
                                                <p className="text-gray-300">
                                                    Intuitive interfaces and
                                                    workflows designed with
                                                    users in mind
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="practice-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-purple-400">
                                                    Community Driven
                                                </h4>
                                                <p className="text-gray-300">
                                                    Regular updates and features
                                                    based on community feedback
                                                    and needs
                                                </p>
                                            </div>
                                            <div className="practice-card bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10 opacity-0 shadow-xl">
                                                <h4 className="text-xl font-semibold mb-3 text-pink-400">
                                                    Security First
                                                </h4>
                                                <p className="text-gray-300">
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
                            <section className="py-16 px-4 relative">
                                <div className="absolute inset-0"></div>
                                <div
                                    ref={ctaRef}
                                    className="max-w-4xl mx-auto text-center relative opacity-0"
                                >
                                    <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                        Ready to Start Creating?
                                    </h3>
                                    <p className="text-gray-300 mb-8 text-lg">
                                        Join our community and start bringing
                                        your ideas to life with amazing
                                        animations!
                                    </p>
                                    <Link
                                        href={route("register")}
                                        className="inline-block rounded-lg px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-pink-600"
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
