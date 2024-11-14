import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AnimationCard from "@/Components/Custom/AnimationCard";

export default function Explore({ auth }) {
    const categories = [
        { name: "Featured", count: 12 },
        { name: "Trending", count: 8 },
        { name: "New", count: 15 },
        { name: "Most Viewed", count: 20 },
    ];

    const featuredAnimations = [
        {
            title: "The Art of Motion",
            creator: "John Doe",
            views: "4.5k",
            href: "/animation/featured/1",
            featured: true
        },
        {
            title: "Digital Dreams",
            creator: "Jane Smith",
            duration: "3:45",
            views: "2.1k",
            href: "/animation/featured/2",
            horizontal: true
        },
        {
            title: "Neon Nights",
            creator: "Mike Johnson",
            duration: "2:30",
            views: "2.1k",
            href: "/animation/featured/3",
            horizontal: true
        }
    ];

    const trendingAnimations = [
        {
            title: "Particle Symphony",
            creator: "Sarah Wilson",
            duration: "2:15",
            views: "1.5k",
            href: "/animation/1",
            trending: true,
            trendingRank: 1
        },
        {
            title: "Geometric Flow",
            creator: "Alex Brown",
            duration: "3:00",
            views: "1.3k",
            href: "/animation/2",
            trending: true,
            trendingRank: 2
        },
        {
            title: "Color Explosion",
            creator: "Emma Davis",
            duration: "1:45",
            views: "1.2k",
            href: "/animation/3",
            trending: true,
            trendingRank: 3
        },
        {
            title: "Abstract Waves",
            creator: "Tom Wilson",
            duration: "2:30",
            views: "1.1k",
            href: "/animation/4",
            trending: true,
            trendingRank: 4
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Explore Animations
                </h2>
            }
        >
            <Head title="Explore Animations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Categories */}
                    <div className="flex overflow-x-auto pb-4 mb-8 space-x-4">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className="flex items-center px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors focus:outline-none group"
                            >
                                <span className="text-white font-medium">{category.name}</span>
                                <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full group-hover:bg-purple-600 transition-colors">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Featured Section */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-6">Featured Animations</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <AnimationCard {...featuredAnimations[0]} />
                            <div className="grid grid-rows-2 gap-6">
                                {featuredAnimations.slice(1).map((animation, index) => (
                                    <AnimationCard key={index} {...animation} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trending Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-6">Trending Now</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trendingAnimations.map((animation, index) => (
                                <AnimationCard key={index} {...animation} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
