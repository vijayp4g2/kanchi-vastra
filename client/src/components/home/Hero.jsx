import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
            </div>

            {/* Floating Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 right-20 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-40 left-20 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative h-full container mx-auto px-6 flex flex-col justify-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20"
                    >
                        <Sparkles className="w-5 h-5 text-gold-300" />
                        <span className="text-lg font-medium tracking-[0.2em] text-cream-100">
                            ONLY FOR HER
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 leading-[0.95]"
                    >
                        Shine <br />
                        <span className="italic font-light bg-gradient-to-r from-gold-200 to-gold-400 bg-clip-text text-transparent">
                            Brightly
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="text-xl md:text-2xl text-cream-100 mb-10 max-w-2xl leading-relaxed font-light"
                    >
                        Discover the timeless elegance of handwoven Kanchipuram silk sarees, crafted with love and tradition.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-white text-gray-900 px-10 py-5 rounded-full font-semibold text-lg tracking-wide flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-xl"
                            >
                                Shop Collection
                                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={22} />
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-semibold text-lg tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300"
                            >
                                Our Story
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-white/70 text-sm mb-3 tracking-wider">Scroll to explore</span>
                <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 64, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-white to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

