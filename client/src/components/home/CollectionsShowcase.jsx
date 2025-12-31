import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import { ArrowRight, Sparkles, TrendingUp, Crown, Heart } from 'lucide-react';

const collections = [
    {
        id: "wedding",
        title: 'Bridal Elegance',
        subtitle: 'Wedding Collection',
        description: 'Exquisite sarees crafted for your special day',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2574&auto=format&fit=crop',
        count: '85+ Designs',
        color: 'from-rose-600/90 to-pink-700/90',
        tag: 'Premium',
        size: 'large',
        icon: Crown
    },
    {
        id: "kanchipuram",
        title: 'Silk Heritage',
        subtitle: 'Kanchipuram Collection',
        description: 'Traditional silk sarees with pure zari work',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop',
        count: '120+ Designs',
        color: 'from-purple-600/90 to-indigo-700/90',
        tag: 'Bestseller',
        size: 'medium',
        icon: Sparkles
    },
    {
        id: "festival",
        title: 'Festival Vibes',
        subtitle: 'Festive Collection',
        description: 'Vibrant colors for celebrations',
        image: 'https://images.unsplash.com/photo-1621644827827-04dc309121a9?q=80&w=2574&auto=format&fit=crop',
        count: '95+ Designs',
        color: 'from-amber-600/90 to-orange-700/90',
        tag: 'Trending',
        size: 'medium',
        icon: TrendingUp
    },
    {
        id: "modern",
        title: 'Contemporary Chic',
        subtitle: 'Modern Collection',
        description: 'Fusion of tradition and modernity',
        image: 'https://images.unsplash.com/photo-1594236413286-a2a4b87ae544?q=80&w=2674&auto=format&fit=crop',
        count: '60+ Designs',
        color: 'from-teal-600/90 to-cyan-700/90',
        tag: 'New Arrival',
        size: 'small',
        icon: Heart
    },
    {
        id: "casual",
        title: 'Everyday Elegance',
        subtitle: 'Casual Collection',
        description: 'Comfortable yet stylish for daily wear',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop',
        count: '110+ Designs',
        color: 'from-emerald-600/90 to-green-700/90',
        tag: 'Popular',
        size: 'small',
        icon: Sparkles
    }
];


const CollectionCard = ({ collection, index }) => {
    const Icon = collection.icon;
    const sizeClasses = {
        large: 'md:col-span-2 md:row-span-2',
        medium: 'md:col-span-1 md:row-span-2',
        small: 'md:col-span-1 md:row-span-1'
    };

    const categoryMap = {
        wedding: 'Wedding',
        kanchipuram: 'Kanchipuram',
        festival: 'Festival',
        modern: 'Modern',
        casual: 'Casual'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-3xl ${sizeClasses[collection.size]} min-h-[400px]`}
        >
            <Link to={`/shop?category=${categoryMap[collection.id] || 'All'}`}>

                <motion.div
                    className="relative w-full h-full cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <motion.img
                            src={collection.image}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${collection.color}`}
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 0.85 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '100%', opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-8 text-white">
                        {/* Top Section */}
                        <div className="flex items-start justify-between">
                            {/* Tag */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
                            >
                                <Icon size={14} />
                                {collection.tag}
                            </motion.div>

                            {/* Count Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold"
                            >
                                {collection.count}
                            </motion.div>
                        </div>

                        {/* Bottom Section */}
                        <div>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-white/80 text-sm uppercase tracking-[0.2em] mb-2"
                            >
                                {collection.subtitle}
                            </motion.p>

                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className={`font-serif font-bold mb-3 ${collection.size === 'large' ? 'text-4xl md:text-5xl' : 'text-3xl'
                                    }`}
                            >
                                {collection.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className={`text-white/90 mb-6 ${collection.size === 'large' ? 'text-lg' : 'text-base'
                                    }`}
                            >
                                {collection.description}
                            </motion.p>

                            {/* Explore Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center gap-3 text-white font-medium group-hover:gap-4 transition-all"
                            >
                                <span>Explore Collection</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </motion.div>

                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                className="h-1 bg-white mt-4 origin-left transition-transform duration-500"
                                style={{ width: '60px' }}
                            />
                        </div>
                    </div>

                    {/* Corner Decorations */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/30"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/30"
                    />
                </motion.div>
            </Link>
        </motion.div>
    );
};

const CollectionsShowcase = () => {
    return (
        <Section className="bg-gradient-to-b from-white via-cream-50/20 to-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-2 mb-4"
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles size={20} className="text-gold-600" />
                    </motion.div>
                    <span className="text-gold-600 uppercase tracking-[0.3em] text-sm font-medium">
                        Discover Our Collections
                    </span>
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles size={20} className="text-gold-600" />
                    </motion.div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6"
                >
                    Curated Collections
                    <br />
                    <span className="text-gold-600 italic font-light">for Every Occasion</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
                >
                    From timeless classics to contemporary designs, explore our handpicked collections
                    that celebrate the beauty of Indian craftsmanship
                </motion.p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-1 w-24 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto mt-8"
                />
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {collections.map((collection, index) => (
                    <CollectionCard key={collection.id} collection={collection} index={index} />
                ))}
            </div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16 relative z-10"
            >
                <Link to="/shop">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-medium hover:from-gold-600 hover:to-gold-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                        <span className="text-lg">Explore All Collections</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                        </motion.div>
                    </motion.button>
                </Link>
            </motion.div>
        </Section>
    );
};

export default CollectionsShowcase;
