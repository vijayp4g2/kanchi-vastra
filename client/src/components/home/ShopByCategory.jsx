import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: 'Silk Sarees',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop',
        count: '120+ Designs',
        color: 'from-rose-500/80 to-pink-600/80',
        description: 'Luxurious silk weaves',
        tag: 'Bestseller'
    },
    {
        id: 2,
        name: 'Wedding Collection',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2574&auto=format&fit=crop',
        count: '85+ Designs',
        color: 'from-purple-500/80 to-indigo-600/80',
        description: 'Grand bridal ensembles',
        tag: 'Premium'
    },
    {
        id: 3,
        name: 'Blouses',
        image: 'https://images.unsplash.com/photo-1621644827827-04dc309121a9?q=80&w=2574&auto=format&fit=crop',
        count: '200+ Designs',
        color: 'from-amber-500/80 to-orange-600/80',
        description: 'Designer blouse pieces',
        tag: 'Trending'
    },
    {
        id: 4,
        name: 'Bangles',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2574&auto=format&fit=crop',
        count: '150+ Designs',
        color: 'from-emerald-500/80 to-teal-600/80',
        description: 'Elegant accessories',
        tag: 'New'
    }
];

const CategoryCard = ({ category, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
                perspective: 1000,
            }}
        >
            <Link to={`/shop?category=${category.name}`}>
                <motion.div
                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                    style={{
                        rotateX: isHovered ? rotateX : 0,
                        rotateY: isHovered ? rotateY : 0,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Image */}
                    <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-t ${category.color}`}
                        animate={{
                            opacity: isHovered ? 0.75 : 0.6,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{
                            x: isHovered ? '100%' : '-100%',
                        }}
                        transition={{ duration: 0.8 }}
                    />

                    {/* Tag Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : -20,
                        }}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                    >
                        <Sparkles size={12} className="text-gold-600" />
                        {category.tag}
                    </motion.div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <motion.h3
                            className="text-2xl font-serif font-semibold mb-2"
                            animate={{
                                y: isHovered ? -4 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {category.name}
                        </motion.h3>

                        <motion.p
                            className="text-sm text-white/80 mb-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                y: isHovered ? 0 : 10,
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {category.description}
                        </motion.p>

                        <motion.p
                            className="text-sm text-white/90 mb-4 font-medium"
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                y: isHovered ? 0 : 10,
                            }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                        >
                            {category.count}
                        </motion.p>

                        {/* Animated Underline */}
                        <motion.div
                            className="h-0.5 bg-white"
                            initial={{ width: 0 }}
                            animate={{
                                width: isHovered ? '48px' : 0,
                            }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Explore Button */}
                        <motion.div
                            className="mt-4 flex items-center gap-2 text-sm font-medium"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : -10,
                            }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            Explore Collection
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </div>

                    {/* Corner Accent */}
                    <motion.div
                        className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/30"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/30"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </Link>
        </motion.div>
    );
};

const ShopByCategory = () => {
    return (
        <Section className="bg-gradient-to-b from-white via-cream-50/30 to-white">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-gold-600 uppercase tracking-[0.3em] text-sm font-medium mb-4 flex items-center justify-center gap-2"
                >
                    <Sparkles size={16} />
                    Curated Collections
                    <Sparkles size={16} />
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-serif text-gray-900 mb-6"
                >
                    Shop by Category
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-lg leading-relaxed"
                >
                    Explore our handpicked collections designed for every occasion,
                    <br className="hidden md:block" />
                    from timeless classics to contemporary elegance
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <CategoryCard key={category.id} category={category} index={index} />
                ))}
            </div>

            {/* View All Link */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12"
            >
                <Link to="/shop">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gold-600 transition-colors duration-300"
                    >
                        View All Collections
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>
        </Section>
    );
};

export default ShopByCategory;
