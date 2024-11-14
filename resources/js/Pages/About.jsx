import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function About({ auth }) {
    const teamMembers = [
        {
            name: "John Doe",
            role: "Founder & CEO",
            image: null,
            bio: "Passionate about bringing animation tools to everyone.",
        },
        {
            name: "Jane Smith",
            role: "Lead Developer",
            image: null,
            bio: "Building the future of web-based animation.",
        },
        {
            name: "Mike Johnson",
            role: "Creative Director",
            image: null,
            bio: "Pushing the boundaries of digital creativity.",
        },
        {
            name: "Sarah Wilson",
            role: "Community Manager",
            image: null,
            bio: "Connecting animators worldwide.",
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    About Us
                </h2>
            }
        >
            <Head title="About Us" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl font-bold text-white mb-4">
                                Empowering Digital Creativity
                            </h1>
                            <p className="text-gray-300 text-lg mb-6">
                                We're on a mission to make animation accessible to everyone. Our platform provides the tools and community you need to bring your creative visions to life.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 transition-all duration-200">
                                    Join Our Community
                                </button>
                                <button className="px-6 py-3 bg-white/10 text-white rounded-md hover:bg-white/20 transition-all duration-200">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
                            <div className="text-gray-300">Active Users</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
                            <div className="text-gray-300">Animations Created</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">100+</div>
                            <div className="text-gray-300">Countries</div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-8 text-center">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center group hover:border-purple-500/50 transition-all duration-300">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                                    <div className="text-purple-400 text-sm mb-3">{member.role}</div>
                                    <p className="text-gray-400 text-sm">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
                            <p className="text-gray-300 mb-6">
                                Have questions or want to learn more about our platform? We'd love to hear from you.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 transition-all duration-200">
                                    Contact Us
                                </button>
                                <button className="px-6 py-3 bg-white/10 text-white rounded-md hover:bg-white/20 transition-all duration-200">
                                    View FAQ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
