import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Filter, Truck, Shield, Clock } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const Bangles = () => {
    const { products, loading, error } = useProduct();
    // Filter products specifically for Bangles
    const [bangleCollections, setBangleCollections] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortBy, setSortBy] = useState('featured');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        if (products) {
            // FIXED: Case-insensitive category matching for Bangles
            const bangles = products.filter(product =>
                product.category && product.category.toLowerCase() === 'bangles'
            );
            setBangleCollections(bangles);
            setSortedProducts(bangles);
        }
    }, [products]);

    // Handle sorting and filtering
    useEffect(() => {
        let filtered = [...bangleCollections];

        // Apply category filters
        if (activeFilter === 'handmade') {
            filtered = filtered.filter(p => p.subCategory === 'Handmade' || p.isHandmade);
        } else if (activeFilter === 'traditional') {
            filtered = filtered.filter(p => p.name.toLowerCase().includes('temple') || p.name.toLowerCase().includes('antique'));
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // IMPROVED: Sort by createdAt date if available, fallback to isNewArrival flag
                filtered.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                    return (b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? 1 : -1);
                });
                break;
            default: // featured
                break;
        }
        setSortedProducts(filtered);
    }, [sortBy, activeFilter, bangleCollections]);


    return (
        <div className="min-h-screen bg-stone-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2670&auto=format&fit=crop"
                        alt="Bangles Collection Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-4 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-[0.2em] uppercase mb-6">
                            Artisanal Craftsmanship
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                            The Bangle <span className="italic text-gold-300">Artistry</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                            Discover our exquisite collection of hand-made and traditional bangles, where every piece tells a story of heritage.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Bar */}
            <div className="bg-white border-b border-stone-100 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Truck size={20} className="text-gold-600" />
                            <span className="text-sm uppercase tracking-wide">Secure Delivery</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Shield size={20} className="text-gold-600" />
                            <span className="text-sm uppercase tracking-wide">Pure Materials</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Clock size={20} className="text-gold-600" />
                            <span className="text-sm uppercase tracking-wide">Handmade Art</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-2">Curated Collections</h2>
                        <p className="text-gray-500 font-light">
                            Showing <span className="text-gray-900 font-semibold">{sortedProducts.length}</span> of <span className="text-gray-900 font-semibold">{bangleCollections.length}</span> exclusive pieces
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {/* Filter Tabs with Product Counts */}
                        <div className="flex bg-stone-100 p-1 rounded-full border border-stone-200">
                            {[
                                { id: 'all', label: 'All', count: bangleCollections.length },
                                {
                                    id: 'handmade',
                                    label: 'Hand Made',
                                    count: bangleCollections.filter(p => p.subCategory === 'Handmade' || p.isHandmade).length
                                },
                                {
                                    id: 'traditional',
                                    label: 'Traditional',
                                    count: bangleCollections.filter(p => p.name.toLowerCase().includes('temple') || p.name.toLowerCase().includes('antique')).length
                                }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeFilter === tab.id
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeFilter === tab.id ? 'bg-gold-100 text-gold-700' : 'bg-stone-200 text-stone-600'}`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="h-8 w-[1px] bg-stone-200 hidden md:block"></div>

                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-medium text-gray-900 focus:outline-none cursor-pointer pr-2"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600 mb-4"></div>
                        <p className="text-stone-500 text-sm">Loading our exquisite collection...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-gray-900 mb-2">Oops! Something went wrong</h3>
                        <p className="text-stone-600 mb-6 max-w-md mx-auto">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-full py-24 text-center bg-white rounded-2xl border border-dashed border-stone-200"
                            >
                                <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-serif text-gray-900 mb-2">No bangles found</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
                                    {activeFilter !== 'all'
                                        ? `We couldn't find any ${activeFilter} bangles. Try viewing all our collections.`
                                        : 'Our artisans are currently crafting new pieces for this collection. Please check back soon.'
                                    }
                                </p>
                                {activeFilter !== 'all' && (
                                    <button
                                        onClick={() => setActiveFilter('all')}
                                        className="px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                                    >
                                        View all bangles
                                        <ArrowRight size={18} />
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>
                )}


                {/* Hand-made Spotlight Section */}
                {activeFilter === 'handmade' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 p-8 md:p-12 rounded-3xl bg-amber-50/50 border border-amber-100 flex flex-col md:flex-row items-center gap-10"
                    >
                        <div className="flex-1">
                            <span className="text-amber-600 font-medium text-sm tracking-widest uppercase mb-4 block">The Artisan Touch</span>
                            <h3 className="text-3xl font-serif text-gray-900 mb-6">Why our Hand-made Bangles?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Sustainable Art", desc: "Using eco-friendly silk threads and recycled materials." },
                                    { title: "Custom Fit", desc: "Available in multiple sizes with flexible designs." },
                                    { title: "Intricate Work", desc: "Each set takes 4-6 hours of focused craftsmanship." },
                                    { title: "Vibrant Palette", desc: "Over 50+ silk thread shades to match your saree." }
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-600 font-light">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1598560912005-09a4736f1831?q=80&w=1200&auto=format&fit=crop"
                                className="w-full h-full object-cover"
                                alt="Handmade process"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-6" />
                            <h3 className="text-3xl font-serif text-white mb-4">Complete Your Look</h3>
                            <p className="text-gray-300 mb-8 font-light">
                                Subscribe to get notified about our exclusive bridal jewelry and bangle sets before everyone else.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-gold-500 transition-colors"
                                />
                                <button className="px-8 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gold-50 transition-colors flex items-center justify-center gap-2">
                                    Join List <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Crafting Process Section */}
                <div className="mt-24 border-t border-stone-100 pt-24 text-center">
                    <span className="text-gold-600 font-medium text-sm tracking-[0.3em] uppercase mb-4 block">The Artisanal Journey</span>
                    <h2 className="text-4xl font-serif text-gray-900 mb-16">How Our Bangles are Crafted</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { step: "01", title: "Base Selection", desc: "Premium quality plastic or metal bases selected for durability." },
                            { step: "02", title: "Silk Wrapping", desc: "Careful wrapping of vibrant silk threads with perfect tension." },
                            { step: "03", title: "Embellishment", desc: "Hand-stitching stones, mirrors, and zari work with precision." },
                            { step: "04", title: "Quality Check", desc: "Each piece inspected for finish and stone security." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div className="text-6xl font-serif text-stone-100 absolute -top-8 left-1/2 -translate-x-1/2 group-hover:text-gold-50 transition-colors">
                                    {item.step}
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-medium text-gray-900 mb-3">{item.title}</h4>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Bangles;
