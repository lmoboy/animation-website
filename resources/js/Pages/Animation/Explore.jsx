import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AnimationCard from "@/Components/Custom/AnimationCard";
import AnimationModal from "@/Components/Modal/AnimationModal";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import { debounce } from "lodash";

export default function Explore({ auth }) {
    const [animations, setAnimations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [meta, setMeta] = useState(null);
    const [selectedAnimation, setSelectedAnimation] = useState(null);

    const categories = [
        { name: "All", filter: "all" },
        { name: "Featured", filter: "featured" },
        { name: "Trending", filter: "trending" },
        { name: "New", filter: "new" },
        { name: "Most Viewed", filter: "most-viewed" },
    ];

    const fetchAnimations = async (options = {}) => {
        const { newSearch = search, newFilter = filter, newPage = 1, append = false } = options;
        
        setLoading(true);
        try {
            const params = new URLSearchParams({
                filter: newFilter,
                page: newPage,
            });
            
            if (newSearch) {
                params.append('search', newSearch);
            }

            const response = await fetch(`/api/animations/search?${params.toString()}`);
            const data = await response.json();
            
            setMeta(data.meta);
            setHasMore(data.meta.current_page < data.meta.last_page);
            
            if (append) {
                setAnimations(prev => [...prev, ...data.data]);
            } else {
                setAnimations(data.data);
            }
            
            setPage(data.meta.current_page);
        } catch (error) {
            console.error('Error fetching animations:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = debounce((value) => {
        setSearch(value);
        fetchAnimations({ newSearch: value, newPage: 1 });
    }, 300);

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        fetchAnimations({ newFilter, newPage: 1 });
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchAnimations({ newPage: page + 1, append: true });
        }
    };

    useEffect(() => {
        fetchAnimations();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Community Animations
                </h2>
            }
        >
            <Head title="Community Animations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Search and Filter Bar */}
                    <div className="mb-8 space-y-4">
                        {/* Search Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <TextInput
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                placeholder="Search animations..."
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="-mb-px flex space-x-8">
                                {categories.map((category) => (
                                    <button
                                        key={category.filter}
                                        onClick={() => handleFilterChange(category.filter)}
                                        className={`
                                            whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                                            ${filter === category.filter
                                                ? 'border-purple-500 text-purple-500'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Grid of Animations */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {animations.map((animation) => (
                            <AnimationCard
                                key={animation.id}
                                animation={animation}
                                onSelect={setSelectedAnimation}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}

                    {/* Animation Modal */}
                    <AnimationModal
                        isOpen={!!selectedAnimation}
                        onClose={() => setSelectedAnimation(null)}
                        animation={selectedAnimation}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
