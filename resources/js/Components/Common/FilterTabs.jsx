export default function FilterTabs({ categories, activeFilter, onFilterChange }) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
                {categories.map((category) => (
                    <button
                        key={category.filter}
                        onClick={() => onFilterChange(category.filter)}
                        className={`
                            whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                            ${activeFilter === category.filter
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
    );
}
