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

const NewArrivals = () => {
    const { products, loading } = useProduct();
    // Filter products marked as new
    const [newArrivals, setNewArrivals] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        if (products) {
            // Filter out Bangles and only show new sarees
            const newProducts = products.filter(product => product.isNewArrival && product.category !== 'Bangles');
            setNewArrivals(newProducts);
            setSortedProducts(newProducts);
        }
    }, [products]);

    // Handle sorting
    useEffect(() => {
        let sorted = [...newArrivals];
        if (sortBy === 'price-low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => b.price - a.price);
        }
        // 'newest' is default (or id based) - currently just default list order
        setSortedProducts(sorted);
    }, [sortBy, newArrivals]);


    return (
        <div className="min-h-screen bg-stone-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop"
                        alt="New Arrivals Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-widest uppercase mb-4">
                            Just Dropped
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                            Fresh off the Loom
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                            Discover our latest masterpieces, handwoven with passion and tradition.
                            Be the first to drape these timeless treasures.
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
                            <span className="text-sm uppercase tracking-wide">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Shield size={20} className="text-gold-600" />
                            <span className="text-sm uppercase tracking-wide">Authentic Silk</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Clock size={20} className="text-gold-600" />
                            <span className="text-sm uppercase tracking-wide">Limited Edition</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-2">The Collection</h2>
                        <p className="text-gray-500">{newArrivals.length} Exclusive Designs</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200">
                            <Filter size={18} className="text-gray-400" />
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-medium text-gray-900 focus:outline-none cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
                    >
                        {sortedProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={fadeInUp}
                                className="group"
                            >
                                <div className="relative">
                                    {/* Seasonal/New Badge specific for this page context if needed, 
                                    though ProductCard might handle it. We can add an extra overlay if we want. */}
                                    <ProductCard product={product} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}


                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-6" />
                            <h3 className="text-3xl font-serif text-white mb-4">Never Miss a New Launch</h3>
                            <p className="text-gray-300 mb-8 font-light">
                                Our new arrivals sell out fast. Join our exclusive list to get early access to new collections.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-gold-500 transition-colors"
                                />
                                <button className="px-8 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gold-50 transition-colors flex items-center justify-center gap-2">
                                    Subscribe <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewArrivals;
