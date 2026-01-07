import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Search, X, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';

const Shop = () => {
    const { products, categories: adminCategories, loading, error } = useProduct();
    // URL Params for deep linking
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    useEffect(() => {
        document.title = "Shop Collection | Kanchi Vastra";
    }, []);

    // State management
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(50000);
    const [sortBy, setSortBy] = useState('featured');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState([]);

    // Derived data - ensure products is available
    // Use adminCategories for the list, fallback to products derivation if admin list is empty
    const categories = adminCategories.length > 0
        ? ['All', ...adminCategories
            .filter(c => c.name !== 'Bangles' && (c.isActive !== false))
            .map(c => c.name)]
        : (products && products.length > 0
            ? ['All', ...new Set(products
                .filter(p => p.category && p.category !== 'Bangles')
                .map(p => p.category))]
            : ['All']);
    const shopProducts = products ? products.filter(p => p.category !== 'Bangles') : [];
    const maxPrice = shopProducts.length > 0 ? Math.max(...shopProducts.map(p => p.price)) : 50000;


    // Update state when URL category changes (e.g. from Header navigation)
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        } else {
            setSelectedCategory('All');
        }
    }, [searchParams]);

    // Update URL when category state changes
    useEffect(() => {
        if (selectedCategory === 'All') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', selectedCategory);
        }
        setSearchParams(searchParams);
    }, [selectedCategory, setSearchParams]);

    // Handle filtering and sorting
    useEffect(() => {
        if (!products) return;

        // EXCLUDE Bangles from the Shop page as they have their own dedicated page
        let result = products.filter(p => p.category !== 'Bangles');

        // Search Filter
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category Filter
        // FIXED: Case-insensitive category matching
        if (selectedCategory !== 'All') {
            result = result.filter(p =>
                (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) ||
                (p.subCategory && p.subCategory.toLowerCase() === selectedCategory.toLowerCase())
            );
        }

        // Price Filter
        result = result.filter(p => p.price <= priceRange);

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // FIXED: Sort by createdAt date if available, fallback to isNewArrival flag
                result.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                    return (b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? 1 : -1);
                });
                break;
            default: // featured
                break;
        }

        setFilteredProducts(result);

        // Update active filters for badges
        const newActive = [];
        if (selectedCategory !== 'All') newActive.push(selectedCategory);
        if (priceRange < maxPrice) newActive.push(`Under ₹${priceRange.toLocaleString()}`);
        setActiveFilters(newActive);

    }, [searchQuery, selectedCategory, priceRange, sortBy, maxPrice, products]);


    const clearFilters = () => {
        setSelectedCategory('All');
        setPriceRange(maxPrice);
        setSearchQuery('');
        setSortBy('featured');
    };

    return (
        <div className="min-h-screen bg-stone-50 pt-20">
            {/* Header Section */}
            <div className="relative bg-[#2c1810] text-gold-100 py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                            Curated Collection
                        </h1>
                        <p className="text-gold-200/80 text-lg md:text-xl font-light leading-relaxed">
                            Discover our handpicked selection of premium Kanjeevarams, Banarasis, and designer sarees crafted for elegance.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden flex justify-between items-center mb-4">
                        <button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg shadow-sm font-medium text-stone-700 hover:text-gold-600 transition-colors"
                        >
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>
                        <span className="text-stone-500 text-sm font-medium">{filteredProducts.length} Results</span>
                    </div>

                    {/* Sidebar Filters - Desktop & Mobile Drawer */}
                    <AnimatePresence>
                        {(isMobileFiltersOpen || window.innerWidth >= 1024) && (
                            <motion.aside
                                initial={window.innerWidth < 1024 ? { x: -300, opacity: 0 } : false}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                className={`
                                    fixed lg:static inset-y-0 left-0 w-80 bg-white lg:bg-transparent z-50 p-6 lg:p-0 overflow-y-auto shadow-2xl lg:shadow-none transition-all duration-300
                                    ${!isMobileFiltersOpen && 'hidden lg:block'}
                                `}
                            >
                                <div className="lg:sticky lg:top-32 space-y-8">

                                    {/* Mobile Header */}
                                    <div className="flex justify-between items-center lg:hidden mb-6">
                                        <h2 className="text-xl font-serif text-stone-900">Filters</h2>
                                        <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-stone-500">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {/* Search */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search collection..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all outline-none font-medium text-stone-700 placeholder:text-stone-400"
                                        />
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                    </div>

                                    {/* Categories */}
                                    <div>
                                        <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            Category
                                            <span className="h-px bg-stone-200 flex-grow"></span>
                                        </h3>
                                        <div className="space-y-3">
                                            {categories.map(category => {
                                                const count = category === 'All'
                                                    ? (products ? products.filter(p => p.category !== 'Bangles').length : 0)
                                                    : (products ? products.filter(p => p.category === category).length : 0);

                                                return (
                                                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                                        <div className="relative flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="category"
                                                                value={category}
                                                                checked={selectedCategory === category}
                                                                onChange={() => setSelectedCategory(category)}
                                                                className="peer appearance-none w-5 h-5 border-2 border-stone-300 rounded-full checked:border-gold-600 checked:bg-gold-600 transition-all"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                            </div>
                                                        </div>
                                                        <span className={`flex-1 flex justify-between items-center text-stone-600 group-hover:text-gold-700 transition-colors ${selectedCategory === category ? 'font-medium text-gold-700' : ''}`}>
                                                            {category}
                                                            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full ml-2">{count}</span>
                                                        </span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            Price Range
                                            <span className="h-px bg-stone-200 flex-grow"></span>
                                        </h3>
                                        <div className="px-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPrice}
                                                step="1000"
                                                value={priceRange}
                                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                                            />
                                            <div className="flex justify-between text-sm text-stone-500 mt-2 font-medium">
                                                <span>₹0</span>
                                                <span>₹{priceRange.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clear Filters (Mobile) */}
                                    <button
                                        onClick={clearFilters}
                                        className="w-full py-3 border border-stone-900 text-stone-900 font-medium rounded-xl hover:bg-stone-900 hover:text-white transition-colors lg:hidden"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Product Grid Area */}
                    <div className="flex-1">

                        {/* Desktop Top Bar */}
                        <div className="hidden lg:flex justify-between items-center mb-8 pb-6 border-b border-stone-200">
                            <div className="text-stone-500 font-medium">
                                Showing <span className="text-stone-900 font-bold">{filteredProducts && filteredProducts.length}</span> masterpieces
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-stone-900 font-medium">Sort by:</span>
                                <div className="relative group min-w-[180px]">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full appearance-none bg-transparent pl-2 pr-8 py-2 border-b-2 border-stone-200 hover:border-gold-500 focus:border-gold-500 outline-none text-stone-700 font-medium cursor-pointer transition-colors"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none group-hover:text-gold-600 transition-colors" size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {activeFilters.map((filter, index) => (
                                    <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-50 text-gold-700 text-sm font-medium rounded-full border border-gold-200 animate-fadeIn">
                                        {filter}
                                        <button
                                            onClick={() => {
                                                if (filter === selectedCategory) setSelectedCategory('All');
                                                if (filter.includes('Range')) setPriceRange(maxPrice);
                                            }}
                                            className="hover:text-gold-900 transition-colors p-0.5"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-stone-500 hover:text-gold-600 underline underline-offset-4 ml-2 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Products Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-serif text-red-600 mb-4">Oops! Something went wrong.</h3>
                                <p className="text-stone-600 mb-6">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <AnimatePresence mode='wait'>
                                {filteredProducts && filteredProducts.length > 0 ? (
                                    <motion.div
                                        key="product-grid"
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
                                    >
                                        {filteredProducts.map((product) => (
                                            <motion.div
                                                key={product.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ProductCard product={product} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="no-products"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="text-center py-24 bg-white rounded-2xl border border-stone-100 shadow-sm"
                                    >
                                        <div className="inline-flex items-center justify-center w-20 h-20 bg-stone-50 rounded-full mb-6 text-stone-400">
                                            <Search size={32} />
                                        </div>
                                        <h3 className="text-2xl font-serif text-stone-900 mb-3">No products found</h3>
                                        <p className="text-stone-500 max-w-xs mx-auto mb-8 leading-relaxed">
                                            We couldn't find any matches for your current filters. Try adjusting your search or categories.
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-xl hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            Clear all filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            {!loading && products && products.length > 0 && (
                <div className="container mx-auto px-4 py-24 border-t border-stone-200 mt-16">
                    <div className="flex flex-col items-center mb-12">
                        <span className="text-gold-600 font-medium text-sm tracking-[0.3em] uppercase mb-3">You might also like</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Recommended for You</h2>
                        <div className="h-1 w-20 bg-gold-500 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products
                            .filter(p => p.category !== 'Bangles') // Exclude bangles from shop recommendations
                            .sort(() => 0.5 - Math.random()) // Shuffle
                            .slice(0, 4) // Take 4
                            .map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
