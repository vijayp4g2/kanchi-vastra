import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Users, Sparkles, MapPin, Clock } from 'lucide-react';

const About = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const stats = [
        { id: 1, number: '25+', label: 'Years of Legacy', icon: <Clock size={24} /> },
        { id: 2, number: '10k+', label: 'Happy Customers', icon: <Users size={24} /> },
        { id: 3, number: '100%', label: 'Authentic Silk', icon: <Award size={24} /> },
        { id: 4, number: '500+', label: 'Exclusive Designs', icon: <Sparkles size={24} /> },
    ];

    const values = [
        {
            title: 'Tradition',
            description: 'We honor the centuries-old art of Kanchipuram weaving, preserving techniques passed down through generations.',
            icon: <MapPin className="text-gold-600" size={32} />
        },
        {
            title: 'Quality',
            description: 'Every thread tells a story of perfection. We use only the finest mulberry silk and pure zari.',
            icon: <Award className="text-gold-600" size={32} />
        },
        {
            title: 'Passion',
            description: 'Driven by a deep love for Indian heritage, we bring you sarees that are more than just garments—they are heirlooms.',
            icon: <Heart className="text-gold-600" size={32} />
        }
    ];

    return (
        <div className="pt-20 min-h-screen bg-stone-50 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80"
                        alt="Kanchipuram Silk Texture"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-4 text-gold-300 tracking-[0.2em] uppercase text-sm font-medium"
                    >
                        Since 1999
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
                    >
                        Weaving Tradition <br /> into <span className="text-gold-400 italic">Timeless Elegance</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light"
                    >
                        Discover the heritage of authentic Kanchipuram silk, crafted with passion and precision.
                    </motion.p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold-500/30"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-gold-500/30"></div>
                        <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1606293967262-b9b68903e6fd?auto=format&fit=crop&q=80"
                                alt="Weaving Loom"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeIn} className="text-gold-600 font-medium tracking-widest uppercase mb-2 text-sm">Our Story</motion.h2>
                        <motion.h3 variants={fadeIn} className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                            Born from the Heart of <span className="italic text-gold-600">Culture</span>
                        </motion.h3>
                        <motion.div variants={fadeIn} className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Kanchi Vastra began as a humble dream to bring the celestial beauty of Kanchipuram silks to the world. Anchored in tradition, our journey started two decades ago in the narrow, bustling streets of the Silk City.
                            </p>
                            <p>
                                We believe that a saree is not just six yards of fabric; it is a canvas where art meets legacy. Working directly with master weavers, we ensure that every drape tells a story of craftsmanship, dedication, and the rich cultural tapestry of India.
                            </p>
                            <p>
                                Today, we stand proud as a beacon of authenticity, curating collections that blend timeless motifs with contemporary sensibilities for the modern woman who cherishes her roots.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-stone-900 py-16 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                                className="text-center group"
                            >
                                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-800 text-gold-400 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <h4 className="text-4xl font-serif font-bold text-white mb-2">{stat.number}</h4>
                                <p className="text-gray-400 uppercase tracking-wider text-xs">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 md:py-32 bg-cream-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-gold-600 uppercase tracking-[0.2em] text-sm font-semibold">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3 mb-6">Why Choose Kanchi Vastra?</h2>
                        <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-transparent hover:border-gold-500 text-center"
                            >
                                <div className="mb-6 flex justify-center">
                                    <div className="p-4 bg-cream-100 rounded-full text-gold-600">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-serif text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / Final CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-stone-900 rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 opacity-40">
                            <img
                                src="https://images.unsplash.com/photo-1585803716631-4c12513470cc?auto=format&fit=crop&q=80"
                                alt="Fabric Background"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60"></div>

                        <div className="relative z-10 px-8 py-20 md:py-24 text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Experience the Legacy</h2>
                            <p className="text-gray-300 mb-10 text-lg md:text-xl font-light">
                                Explore our exclusive collection of handpicked sarees, waiting to become a part of your story.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gold-500 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/30"
                            >
                                Shop the Collection
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
