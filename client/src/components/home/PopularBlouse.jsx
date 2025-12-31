import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import { useProduct } from '../../context/ProductContext';
import { ArrowRight, Heart, ShoppingBag, Eye, Star } from 'lucide-react';

import { useQuickView } from '../../context/QuickViewContext'; // Import hook

const BlouseCard = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { openQuickView } = useQuickView(); // Use hook

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${item.id}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 bg-gray-100">
                    {/* Image */}
                    <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Top Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : -10,
                        }}
                        className="absolute top-4 left-4 bg-gold-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
                    >
                        <Star size={12} className="fill-white" />
                        Top Rated
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20,
                        }}
                        transition={{ delay: 0.1 }}
                        className="absolute top-4 right-4 flex flex-col gap-2"
                        onClick={(e) => e.preventDefault()}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-gold-600 hover:text-white transition-colors shadow-lg"
                        >
                            <Heart size={18} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.preventDefault();
                                openQuickView(item);
                            }}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-gold-600 hover:text-white transition-colors shadow-lg"
                        >
                            <Eye size={18} />
                        </motion.button>
                    </motion.div>

                    {/* Add to Cart Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20,
                        }}
                        transition={{ delay: 0.15 }}
                        className="absolute bottom-4 left-4 right-4"
                        onClick={(e) => e.preventDefault()}
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white/95 backdrop-blur-sm text-gray-900 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gold-600 hover:text-white transition-colors shadow-lg"
                        >
                            <ShoppingBag size={18} />
                            Add to Cart
                        </motion.button>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    <motion.h3
                        className="text-xl font-serif text-gray-900"
                        animate={{
                            x: isHovered ? 4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {item.name}
                    </motion.h3>

                    <div className="flex items-center justify-between">
                        <motion.p
                            className="text-lg font-semibold text-gold-600"
                            animate={{
                                scale: isHovered ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            ₹{item.price.toLocaleString()}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : -10,
                            }}
                            className="flex items-center gap-1 text-sm text-gray-500"
                        >
                            <Star size={14} className="fill-gold-500 text-gold-500" />
                            <span>4.8</span>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const PopularBlouse = () => {
    const { products, loading } = useProduct();
    const [blouses, setBlouses] = useState([]);

    useEffect(() => {
        if (products) {
            // Check for category 'Blouse' or fallback to some logic or empty
            const filtered = products.filter(p => p.category === 'Blouse' || p.category === 'Blouses');

            // If we have none in DB yet, maybe just show nothing or loading? 
            // For now, let's filter. If empty, the grid will be empty.
            // Ideally we should seed the data.
            setBlouses(filtered.slice(0, 3));
        }
    }, [products]);

    if (blouses.length === 0 && !loading) return null; // Hide section if no blouses

    return (
        <Section className="bg-gradient-to-b from-cream-50/30 to-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-600 uppercase tracking-[0.3em] text-sm font-medium flex items-center gap-2"
                    >
                        <Star size={16} className="fill-gold-600" />
                        Top Rated
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif text-gray-900 mt-3"
                    >
                        Popular Blouse Designs
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="h-1 w-20 bg-gradient-to-r from-gold-600 to-gold-400 mt-4 origin-left"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:block"
                >
                    <Link to="/shop?category=Blouses">
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 text-gray-600 hover:text-gold-600 transition-colors font-medium"
                        >
                            <span>View All Designs</span>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blouses.map((item, index) => (
                    <BlouseCard key={item.id} item={item} index={index} />
                ))}
            </div>

            {/* Mobile View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center md:hidden"
            >
                <Link to="/shop?category=Blouses">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gold-600 transition-colors duration-300"
                    >
                        View All Designs
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>
        </Section>
    );
};


export default PopularBlouse;
