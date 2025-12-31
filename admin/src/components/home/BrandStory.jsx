import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../common/Section';

const BrandStory = () => {
    return (
        <Section className="bg-cream-100 mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-2 md:order-1"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop"
                                alt="Saree Detail"
                                className="rounded-2xl w-full h-64 object-cover mt-8 shadow-lg"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2574&auto=format&fit=crop"
                                alt="Weaving"
                                className="rounded-2xl w-full h-64 object-cover shadow-lg"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                            className="col-span-2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1621644827827-04dc309121a9?q=80&w=2574&auto=format&fit=crop"
                                alt="Traditional Craft"
                                className="rounded-2xl w-full h-48 object-cover shadow-lg"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-600 uppercase tracking-widest text-sm font-medium mb-4 block"
                    >
                        Our Heritage
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight"
                    >
                        Weaving Stories <br /> of Tradition.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 leading-relaxed text-lg mb-6"
                    >
                        At Kanchi Vastra, we believe every saree tells a story. Born from the looms of Kanchipuram, our creations are a harmonious blend of age-old artistry and contemporary elegance.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 leading-relaxed text-lg mb-8"
                    >
                        Each thread is handpicked, each motif woven with devotion, creating six yards of sheer grace designed for the modern woman who cherishes her roots.
                    </motion.p>
                    <Link to="/about">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gold-500 transition-colors shadow-lg"
                        >
                            Read Our Story
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </Section>
    );
};

export default BrandStory;

