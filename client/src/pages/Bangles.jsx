import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Filter, Shield, Clock } from 'lucide-react';
import api from '../utils/api';
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
    const { products } = useProduct();
    const [bangleCollections, setBangleCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortBy, setSortBy] = useState('featured');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const fetchBangles = async () => {
            setLoading(true);
            try {
                // Fetch specifically for Bangles
                const data = await api.getProducts({
                    category: 'Bangles',
                    status: 'Active',
                    pageSize: 1000 // Get all bangles
                });
                const bangles = data.products || [];
                setBangleCollections(bangles);
                setSortedProducts(bangles);
                setError(null);
            } catch (err) {
                console.error('Error fetching bangles:', err);
                setError('Failed to load bangles collection');
            } finally {
                setLoading(false);
            }
        };

        fetchBangles();
    }, []);

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
            <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="/assets/hero/bangles-hero.png"
                        alt="Handcrafted Luxury Bangles"
                        className="w-full h-full object-cover"
                    />
                    {/* Multi-layered overlays for depth */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                </motion.div>

                {/* Floating Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                y: [0, -20, 0],
                                x: [0, 10, 0]
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                delay: i * 0.5
                            }}
                            className="absolute"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        >
                            <Sparkles className="text-gold-300/30 w-4 h-4" />
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ letterSpacing: "0.5em", opacity: 0 }}
                            animate={{ letterSpacing: "0.2em", opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="inline-block py-2 px-6 border border-gold-300/30 rounded-full bg-white/5 backdrop-blur-md text-gold-200 text-xs md:text-sm uppercase mb-8 shadow-2xl"
                        >
                            Artisanal Craftsmanship
                        </motion.span>
                        <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight">
                            The Bangle <span className="relative inline-block">
                                <span className="italic text-gold-300">Artistry</span>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="absolute -bottom-2 left-0 h-[1px] bg-gold-400"
                                />
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                            Where every circle tells a story. Discover our curated collection of <span className="text-gold-100 font-normal">hand-woven silk</span> and <span className="text-gold-100 font-normal">traditional temple</span> designs.
                        </p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <button
                                onClick={() => document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-10 py-4 bg-white text-gray-900 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                            >
                                <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
                                    Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gold-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                </motion.div>
            </section>


            {/* Content Area */}
            <section id="collection-grid" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
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

                {/* Recommendations Section */}
                {products && products.length > 0 && (
                    <div className="mt-32 pt-24 border-t border-stone-100">
                        <div className="flex flex-col items-center mb-16">
                            <span className="text-gold-600 font-medium text-sm tracking-[0.3em] uppercase mb-4 block">Complete Your Ensemble</span>
                            <h2 className="text-4xl font-serif text-gray-900 mb-4">Recommended for You</h2>
                            <div className="h-1.5 w-24 bg-gold-400 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products
                                .filter(p => !p.category || p.category !== 'Bangles') // Recommend non-bangles
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 4)
                                .map(product => (
                                    <ProductCard key={product.id || product._id} product={product} />
                                ))
                            }
                        </div>
                        <div className="text-center mt-12">
                            <button
                                onClick={() => window.location.href = '/shop'}
                                className="inline-flex items-center gap-2 text-stone-600 font-medium hover:text-gold-600 transition-colors uppercase tracking-widest text-xs"
                            >
                                View full saree collection <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Quality Assurance Section */}
                <div className="mt-32 bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-stone-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold-50/50 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-gold-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Our Promise</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">Authenticity in every <br />single thread.</h2>
                            <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg">
                                Each bangle set undergoes a rigorous 3-step quality check. We ensure that the silk is pure, the stone setting is secure, and the base is skin-friendly.
                            </p>
                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-700">
                                        <Shield size={24} />
                                    </div>
                                    <span className="font-bold text-gray-900">Certified <br />Quality</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-700">
                                        <Clock size={24} />
                                    </div>
                                    <span className="font-bold text-gray-900">Ethical <br />Sourcing</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1610030469668-93530c176cc0?q=80&w=1200&auto=format&fit=crop"
                                    alt="Quality check"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Status</p>
                                        <p className="text-sm font-bold text-gray-900">Quality Verified</p>
                                    </div>
                                </div>
                            </div>
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
