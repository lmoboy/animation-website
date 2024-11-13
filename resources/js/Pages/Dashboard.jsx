import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const cards = [
        {
            title: "Animation Tool",
            description: "Create and customize your animations",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            ),
            route: "animation.tool",
            gradient: "from-emerald-400 to-cyan-400",
        },
        {
            title: "Featured Animations",
            description: "Explore trending animations",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            route: "animation.featured",
            gradient: "from-pink-400 to-purple-400",
        },
        {
            title: "Search",
            description: "Find the perfect animation",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            route: "animation.search",
            gradient: "from-blue-400 to-indigo-400",
        },
        {
            title: "About",
            description: "Learn more about our platform",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            route: "animation.about",
            gradient: "from-orange-400 to-pink-400",
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white/90 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {cards.map((card) => (
                        <Link
                            key={card.route}
                            href={route(card.route)}
                            className="scale-100 p-6 bg-gradient-to-br shadow-2xl shadow-black/5 hover:shadow-2xl hover:shadow-black/5 flex 
                                     motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-purple-500
                                     rounded-xl overflow-hidden relative group ${card.gradient}"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-75 group-hover:opacity-100 transition-opacity duration-250 ${card.gradient}"></div>
                            <div className="relative">
                                <div className="h-16 w-16 bg-white/20 flex items-center justify-center rounded-xl mb-4 backdrop-blur-2xl">
                                    {card.icon}
                                </div>

                                <h2 className="text-xl font-semibold text-white/90 group-hover:text-white">
                                    {card.title}
                                </h2>

                                <p className="mt-4 text-white/70 text-sm leading-relaxed group-hover:text-white/90">
                                    {card.description}
                                </p>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    className="w-6 h-6 stroke-white/40 group-hover:stroke-white transition-colors duration-250 mt-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
