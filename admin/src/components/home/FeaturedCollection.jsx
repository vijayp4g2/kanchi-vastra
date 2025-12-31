import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';

const FeaturedCollection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="w-full bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1410] overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px] relative">
                {/* Content Side */}
                <div className="flex flex-col justify-center px-8 py-20 lg:px-24 lg:py-0 order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Floating Sparkles */}
                        <motion.div
                            animate={{
                                y: [-10, 10, -10],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-8 -right-8 text-gold-500/30"
                        >
                            <Sparkles size={32} />
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "auto" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="overflow-hidden"
                        >
                            <span className="text-gold-500 uppercase tracking-[0.3em] text-sm font-medium mb-6 flex items-center gap-2">
                                <Star size={16} className="fill-gold-500" />
                                Limited Edition
                                <Star size={16} className="fill-gold-500" />
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-4xl lg:text-7xl font-serif mb-8 leading-[1.1] text-white"
                        >
                            The Royal <br />
                            <span className="italic font-light bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
                                Heirloom Edit
                            </span>
                        </motion.h2>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="w-20 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mb-10 origin-left"
                        />

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg font-light"
                        >
                            Experience the grandeur of Kanchipuram's finest weaves. Each saree in this collection takes over 45 days to handweave, featuring pure silver zari and time-honored motifs.
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mb-12 space-y-3"
                        >
                            {['Pure Kanchipuram Silk', 'Handwoven with Silver Zari', 'Heritage Motifs'].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="flex items-center gap-3 text-gray-300"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                    <span className="text-sm font-light">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                        >
                            <Link to="/shop?category=Wedding">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative w-fit bg-transparent border-2 border-gold-500/50 text-white px-10 py-4 rounded-full font-medium hover:bg-gold-600 hover:border-gold-600 transition-all duration-300 flex items-center gap-4 overflow-hidden"
                                >
                                    <span className="relative z-10">Explore the Series</span>
                                    <motion.span
                                        className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-gold-600/0 via-gold-500/20 to-gold-600/0"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Image Side with Parallax */}
                <div className="relative h-[500px] lg:h-full order-1 lg:order-2 overflow-hidden">
                    <motion.div
                        style={{ y: imageY }}
                        className="absolute inset-0 h-[120%] -top-[10%]"
                    >
                        <motion.div
                            className="relative w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1621644827827-04dc309121a9?q=80&w=2574&auto=format&fit=crop"
                                alt="Royal Heirloom Collection"
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-transparent to-transparent lg:via-[#111]/10 lg:to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Decorative Frame */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1, duration: 1 }}
                                className="absolute inset-8 border border-white/10 pointer-events-none"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="absolute top-8 right-8 bg-gold-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl z-10"
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Only 50 Pieces
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
