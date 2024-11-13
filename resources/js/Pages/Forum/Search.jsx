import { useState, useEffect, useMemo, useCallback } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AnimationContainer from "@/Components/Custom/AnimationContainer";
import { Head } from "@inertiajs/react";
import debounce from 'lodash/debounce';

export default function Search({ auth }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        category: "all",
        sortBy: "relevance",
        timeframe: "all",
        complexity: "all"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = useMemo(() => [
        { id: "all", name: "All Categories" },
        { id: "motion", name: "Motion Graphics" },
        { id: "text", name: "Text Animations" },
        { id: "transitions", name: "Transitions" },
        { id: "effects", name: "Special Effects" }
    ], []);

    const sortOptions = useMemo(() => [
        { id: "relevance", name: "Most Relevant" },
        { id: "newest", name: "Newest First" },
        { id: "popular", name: "Most Popular" },
        { id: "trending", name: "Trending Now" }
    ], []);

    const timeframeOptions = useMemo(() => [
        { id: "all", name: "All Time" },
        { id: "day", name: "Last 24 Hours" },
        { id: "week", name: "This Week" },
        { id: "month", name: "This Month" },
        { id: "year", name: "This Year" }
    ], []);

    const complexityOptions = useMemo(() => [
        { id: "all", name: "Any Complexity" },
        { id: "simple", name: "Simple" },
        { id: "moderate", name: "Moderate" },
        { id: "complex", name: "Complex" }
    ], []);

    const debouncedSearch = useCallback(
        debounce(async (term, currentFilters) => {
            if (!term.trim()) {
                setSearchResults([]);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const queryParams = new URLSearchParams({
                    q: term,
                    ...currentFilters
                });
                const response = await fetch(`/api/animations/search?${queryParams}`);
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.error || 'Failed to fetch results');
                
                setSearchResults(data);
            } catch (error) {
                console.error("Search error:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm, filters);
    }, [searchTerm, filters, debouncedSearch]);

    const FilterButton = ({ options, currentValue, onChange, label }) => (
        <div className="relative">
            <select
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-xl 
                         text-white border border-white/10 focus:border-fuchsia-500 focus:ring-1 
                         focus:ring-fuchsia-500 transition-colors duration-200"
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id} className="bg-gray-900 text-white">
                        {option.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/50">
                <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white/90 leading-tight">
                    Search Animations
                </h2>
            }
        >
            <Head title="Search Animations" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-white/50" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for animations..."
                            className="block w-full pl-10 pr-3 py-4 border border-white/10 rounded-lg 
                                     bg-white/10 backdrop-blur-xl text-white placeholder-white/50 text-lg
                                     focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500
                                     transition-colors duration-200"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <FilterButton
                        options={categories}
                        currentValue={filters.category}
                        onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                        label="Category"
                    />
                    <FilterButton
                        options={sortOptions}
                        currentValue={filters.sortBy}
                        onChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                        label="Sort By"
                    />
                    <FilterButton
                        options={timeframeOptions}
                        currentValue={filters.timeframe}
                        onChange={(value) => setFilters(prev => ({ ...prev, timeframe: value }))}
                        label="Time Frame"
                    />
                    <FilterButton
                        options={complexityOptions}
                        currentValue={filters.complexity}
                        onChange={(value) => setFilters(prev => ({ ...prev, complexity: value }))}
                        label="Complexity"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 bg-red-100/10 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Results Grid */}
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
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((item) => (
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
                                            <div className="flex items-center space-x-4">
                                                <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                                                    {item.category || "Uncategorized"}
                                                </span>
                                                <span className="text-sm text-white/50">
                                                    {item.complexity || "Simple"}
                                                </span>
                                            </div>
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
                ) : searchTerm ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-white/90">No animations found</h3>
                        <p className="mt-2 text-sm text-white/70">Try adjusting your search terms or filters</p>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-white/90">Start your search</h3>
                        <p className="mt-2 text-sm text-white/70">Enter keywords to find animations</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
