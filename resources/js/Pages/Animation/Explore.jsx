import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AnimationCard from "@/Components/Custom/AnimationCard";
import AnimationModal from "@/Components/Modal/AnimationModal";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import SearchBar from "@/Components/Common/SearchBar";
import FilterTabs from "@/Components/Common/FilterTabs";
import PageHeader from "@/Components/Common/PageHeader";

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
        >
            <Head title="Community Animations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Search and Filter Bar */}
                    <div className="mb-8 space-y-4">
                        <SearchBar onChange={handleSearchChange} />
                        <FilterTabs 
                            categories={categories}
                            activeFilter={filter}
                            onFilterChange={handleFilterChange}
                        />
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
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
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
