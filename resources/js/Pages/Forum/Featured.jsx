import { useState, useEffect, useMemo, useCallback } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AnimationContainer from "@/Components/Custom/AnimationContainer";
import { Head } from "@inertiajs/react";
import debounce from 'lodash/debounce';

export default function Featured({ auth }) {
    const [featured, setFeatured] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = useMemo(() => [
        { id: "all", name: "All Animations" },
        { id: "new", name: "New & Trending" },
        { id: "popular", name: "Most Popular" },
        { id: "featured", name: "Staff Picks" },
    ], []);

    const filteredAnimations = useMemo(() => {
        if (!featured.length) return [];
        
        return featured.filter(item => {
            const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [featured, searchTerm, selectedCategory]);

    const debouncedSetSearchTerm = useCallback(
        debounce((value) => setSearchTerm(value), 300),
        []
    );

    const handleSearchChange = (e) => {
        const { value } = e.target;
        e.persist();
        debouncedSetSearchTerm(value);
    };

    const fetchFeaturedAnimations = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("/api/animations/featured");
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.error || 'Failed to fetch animations');
            
            setFeatured(data);
        } catch (error) {
            console.error("Error fetching featured animations:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeaturedAnimations();
    }, [fetchFeaturedAnimations]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white/90 leading-tight">
                    Featured Animations
                </h2>
            }
        >
            <Head title="Featured Animations" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Search and Filter Section */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-white/50" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg 
                                         bg-white/10 backdrop-blur-xl text-white placeholder-white/50
                                         focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500
                                         transition-colors duration-200"
                                placeholder="Search animations..."
                                onChange={handleSearchChange}
                            />
                        </div>
                        
                        <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                              ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                              }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 bg-red-100/10 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Animations Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="rounded-lg bg-white/10 h-64"></div>
                                <div className="mt-4 h-4 bg-white/10 rounded w-3/4"></div>
                                <div className="mt-2 h-4 bg-white/10 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnimations.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-lg overflow-hidden
                                         transition-all duration-300 hover:from-gray-900/60 hover:to-black/60 hover:shadow-xl
                                         hover:shadow-fuchsia-500/10 hover:-translate-y-1 border border-white/5"
                            >
                                <AnimationContainer data={item}>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white/90 group-hover:text-white">
                                            {item.name || "Untitled Animation"}
                                        </h3>
                                        <p className="mt-1 text-sm text-white/70 group-hover:text-white/90">
                                            {item.description || "No description available"}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center">
                                                    <svg className="h-4 w-4 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-white/70">{item.likes || 0} likes</span>
                                            </div>
                                        </div>
                                    </div>
                                </AnimationContainer>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredAnimations.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-white/90">No animations found</h3>
                        <p className="mt-2 text-sm text-white/70">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
