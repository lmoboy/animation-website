import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function About({ auth }) {
    const heroRef = useRef(null);
    const missionRef = useRef(null);
    const visionRef = useRef(null);
    const teamRefs = useRef([]);

    useEffect(() => {
        // Hero section animation
        anime({
            targets: heroRef.current,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutCubic'
        });

        // Mission and Vision cards animation
        anime({
            targets: [missionRef.current, visionRef.current],
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200, { start: 400 }),
            duration: 1000,
            easing: 'easeOutCubic'
        });

        // Team members animation
        anime({
            targets: teamRefs.current,
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: anime.stagger(150, { start: 800 }),
            duration: 800,
            easing: 'easeOutElastic(1, .6)'
        });

        // Continuous floating animation for orbs
        anime({
            targets: '.floating-orb',
            translateY: ['-10px', '10px'],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="About Us" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div ref={heroRef} className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-black p-8 mb-8 opacity-0">
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold text-purple-300 mb-4">
                                Bringing Animations to Life
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl">
                                We're passionate about making animation creation accessible to everyone. 
                                Our platform combines powerful tools with an intuitive interface to help 
                                you bring your creative visions to reality.
                            </p>
                        </div>
                        <div className="floating-orb absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl"></div>
                        <div className="floating-orb absolute bottom-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full mix-blend-screen filter blur-2xl" style={{ animationDelay: '-1.5s' }}></div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div ref={missionRef} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 opacity-0">
                            <h3 className="text-2xl font-semibold text-purple-300 mb-4">Our Mission</h3>
                            <p className="text-gray-300">
                                To democratize animation creation by providing powerful yet intuitive tools 
                                that empower creators of all skill levels to express their creativity through motion.
                            </p>
                        </div>

                        <div ref={visionRef} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 opacity-0">
                            <h3 className="text-2xl font-semibold text-purple-300 mb-4">Our Vision</h3>
                            <p className="text-gray-300">
                                We envision a world where anyone can bring their stories and ideas to life 
                                through beautiful, engaging animations without technical barriers.
                            </p>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8">
                        <h2 className="text-3xl font-bold text-purple-300 mb-8">Meet Our Team</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: 'Sarah Chen',
                                    role: 'Lead Designer',
                                    bio: 'Passionate about creating intuitive and beautiful user experiences.'
                                },
                                {
                                    name: 'Alex Rodriguez',
                                    role: 'Technical Lead',
                                    bio: 'Building robust and scalable animation tools for the next generation.'
                                },
                                {
                                    name: 'Maya Patel',
                                    role: 'Community Manager',
                                    bio: 'Fostering a supportive and inspiring community of creators.'
                                }
                            ].map((member, index) => (
                                <div 
                                    key={index} 
                                    ref={el => teamRefs.current[index] = el}
                                    className="text-center opacity-0"
                                >
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                        <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-purple-300 mb-2">{member.name}</h4>
                                    <p className="text-gray-400 font-medium mb-2">{member.role}</p>
                                    <p className="text-gray-300">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
