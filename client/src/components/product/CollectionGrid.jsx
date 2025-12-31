import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import ProductCard from './ProductCard';
import { useProduct } from '../../context/ProductContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const CollectionGrid = ({ title, category, className = "" }) => {
    const { products, loading } = useProduct();
    // Filter products by category, limit to 4 for the preview
    const displayProducts = products.filter(p => p.category === category).slice(0, 4);
    // If no specific category filtering or not enough products, just show some default ones (for demo purposes if data is sparse)
    const itemsToShow = displayProducts.length > 0 ? displayProducts : products.slice(0, 4);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <Section className={`relative overflow-hidden ${className}`}>
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl translate-x-32 translate-y-32" />

            {/* Header */}
            <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center md:justify-start gap-2 mb-3"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles size={20} className="text-gold-600" />
                        </motion.div>
                        <span className="text-gold-600 uppercase tracking-[0.2em] text-xs font-medium">
                            Handpicked for You
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif text-gray-900 mb-2"
                    >
                        {title}
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="h-1 w-20 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto md:mx-0 origin-left"
                    />
                </div>

                {/* Desktop Explore Button */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:block"
                >
                    <Link to={`/shop?category=${category}`}>
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 text-gray-600 hover:text-gold-600 transition-colors font-medium"
                        >
                            <span>Explore Collection</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >

                    {itemsToShow.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            )}


            {/* Mobile Explore Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center md:hidden"
            >
                <Link to={`/shop?category=${category}`}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gold-600 transition-colors duration-300"
                    >
                        Explore Collection
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>

            {/* Bottom Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent origin-center"
            />
        </Section>
    );
};

export default CollectionGrid;
