import { Link } from "@inertiajs/react";

export default function AnimationCard({ 
    title = "Animation Title",
    creator = "Creator Name",
    duration = "0:00",
    views = "0",
    timeAgo = "just now",
    featured = false,
    trending = false,
    trendingRank,
    href = "#",
    horizontal = false,
    className = ""
}) {
    return (
        <Link
            href={href}
            className={`bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden group hover:border-purple-500/50 transition-all duration-300 ${className}`}
        >
            {horizontal ? (
                <div className="flex">
                    <div className="w-48 bg-black/30 relative group-hover:bg-black/40 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white/20 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1 p-4">
                        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
                        <p className="text-gray-400 text-sm mb-3">By {creator}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">{duration}</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400 text-sm">{views} views</span>
                                {trending && (
                                    <>
                                        <span className="text-purple-400">•</span>
                                        <span className="text-purple-400 text-sm">#{trendingRank}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="aspect-video bg-black/30 relative group-hover:bg-black/40 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} text-white/20 group-hover:text-purple-500 transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                        </div>
                    </div>
                    <div className={`${featured ? 'p-6' : 'p-4'}`}>
                        <h4 className={`${featured ? 'text-xl' : 'text-lg'} font-semibold text-white mb-2`}>{title}</h4>
                        {featured ? (
                            <>
                                <p className="text-gray-400 mb-4">A stunning animation showcasing the best of our platform.</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                                            {creator.charAt(0)}
                                        </div>
                                        <span className="ml-2 text-white">{creator}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-400">{views} views</span>
                                        <button className="px-4 py-2 bg-purple-500 rounded-md text-white hover:bg-purple-600 transition-colors">
                                            Watch Now
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-400 text-sm mb-3">By {creator}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">{duration}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400 text-sm">{views} views</span>
                                        {timeAgo && (
                                            <>
                                                <span className="text-purple-400">•</span>
                                                <span className="text-gray-400 text-sm">{timeAgo}</span>
                                            </>
                                        )}
                                        {trending && (
                                            <>
                                                <span className="text-purple-400">•</span>
                                                <span className="text-purple-400 text-sm">#{trendingRank}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </Link>
    );
}
