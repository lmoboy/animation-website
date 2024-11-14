import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import AnimationCard from "@/Components/Custom/AnimationCard";

export default function Search({ auth }) {
    const demoAnimations = [
        {
            title: "Floating Particles",
            creator: "John Doe",
            duration: "2:30",
            views: "1.2k",
            timeAgo: "2 days ago",
            href: "/animation/1"
        },
        {
            title: "Abstract Waves",
            creator: "Jane Smith",
            duration: "1:45",
            views: "3.4k",
            timeAgo: "1 week ago",
            href: "/animation/2"
        },
        {
            title: "Geometric Patterns",
            creator: "Mike Johnson",
            duration: "3:15",
            views: "856",
            timeAgo: "3 days ago",
            href: "/animation/3"
        },
        {
            title: "Color Flow",
            creator: "Sarah Wilson",
            duration: "4:00",
            views: "2.1k",
            timeAgo: "5 days ago",
            href: "/animation/4"
        },
        {
            title: "Dynamic Typography",
            creator: "Alex Brown",
            duration: "2:15",
            views: "1.5k",
            timeAgo: "1 day ago",
            href: "/animation/5"
        },
        {
            title: "Motion Graphics",
            creator: "Emma Davis",
            duration: "1:30",
            views: "987",
            timeAgo: "4 days ago",
            href: "/animation/6"
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Search Animations
                </h2>
            }
        >
            <Head title="Search Animations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <TextInput
                                className="w-full bg-white/10 border-white/20 focus:border-purple-500 focus:ring-purple-500 text-white pl-12 pr-4 py-3"
                                placeholder="Search animations..."
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <select className="bg-white/10 border-white/20 rounded-md text-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <option>All Categories</option>
                            <option>2D Animation</option>
                            <option>3D Animation</option>
                            <option>Motion Graphics</option>
                        </select>
                        <select className="bg-white/10 border-white/20 rounded-md text-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <option>Duration</option>
                            <option>0-30 seconds</option>
                            <option>30-60 seconds</option>
                            <option>1-3 minutes</option>
                            <option>3+ minutes</option>
                        </select>
                        <select className="bg-white/10 border-white/20 rounded-md text-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <option>Date Added</option>
                            <option>Last 24 hours</option>
                            <option>Last week</option>
                            <option>Last month</option>
                            <option>Last year</option>
                        </select>
                        <select className="bg-white/10 border-white/20 rounded-md text-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <option>Sort By</option>
                            <option>Most Recent</option>
                            <option>Most Popular</option>
                            <option>Most Viewed</option>
                        </select>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demoAnimations.map((animation, index) => (
                            <AnimationCard
                                key={index}
                                {...animation}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="px-4 py-2 bg-purple-500 rounded-lg text-white">1</button>
                            <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">2</button>
                            <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">3</button>
                            <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
