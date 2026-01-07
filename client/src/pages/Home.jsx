import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { ArrowRight, Star, Truck, ShieldCheck, Clock, ShoppingBag, ChevronRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-subtle-zoom"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop')",
                    animation: "zoomEffect 20s infinite alternate"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
            </div>
            <style>{`
                @keyframes zoomEffect {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
            `}</style>

            {/* Hero Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto z-10">
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-block py-2 px-6 border border-amber-300/30 rounded-full bg-black/20 backdrop-blur-md text-amber-300 uppercase tracking-[0.2em] text-xs md:text-sm font-medium mb-8 shadow-lg"
                >
                    Authentic • Handcrafted • Heritage
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight drop-shadow-2xl"
                >
                    Timeless Elegance of <br />
                    <span className="text-amber-100 italic">Kanchipuram Silk</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-stone-200 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed"
                >
                    Every thread tells a story of tradition, woven with passion and authenticity for the modern grace.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Link
                        to="/shop"
                        className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-white bg-gradient-to-r from-amber-700 to-amber-600 rounded-full shadow-xl shadow-amber-900/40 hover:shadow-amber-700/50 transition-all duration-300 hover:scale-105"
                    >
                        <span className="mr-2 tracking-wide font-serif">Shop Collection</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        to="/bangles"
                        className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-white border border-white/40 rounded-full transition-all duration-300 hover:bg-white hover:text-red-950 backdrop-blur-sm shadow-sm hover:shadow-white/20"
                    >
                        <span className="mr-2 tracking-wide font-serif">Explore Bangles</span>
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-white opacity-70" />
            </motion.div>
        </div>
    );
};

const FeaturesSection = () => {
    const features = [
        { icon: Truck, title: "Free Global Shipping", desc: "On all premium orders" },
        { icon: ShieldCheck, title: "Silk Mark Certified", desc: "100% Authentic Purity" },
        { icon: Clock, title: "Priority Support", desc: "24/7 Dedicated Assistance" },
        { icon: Star, title: "Exclusive Collection", desc: "Handpicked Artisan Designs" },
    ];

    return (
        <div className="bg-stone-50 py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300 group"
                        >
                            <div className="p-5 rounded-full bg-amber-50 text-amber-800 mb-6 group-hover:bg-amber-900 group-hover:text-amber-100 transition-colors duration-300 border border-amber-100">
                                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xl font-serif font-semibold text-gray-900 mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-500 font-light tracking-wide">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CategoriesSection = () => (
    <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Curated Collections</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[350px]">
                {/* Large Card 1 - Sarees */}
                <Link to="/shop?category=Sarees" className="group relative col-span-1 md:col-span-8 overflow-hidden rounded-xl shadow-lg cursor-pointer">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/assets/kanchipuram_saree_collection.png')" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="text-amber-300 uppercase tracking-widest text-xs font-bold mb-2 block animate-fade-in">Signature Collection</span>
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 italic">Kanchipuram Sarees</h3>
                        <div className="w-12 h-0.5 bg-amber-400 mt-4 group-hover:w-24 transition-all duration-300" />
                    </div>
                </Link>

                {/* Card 2 - Bangles */}
                <Link to="/bangles" className="group relative col-span-1 md:col-span-4 overflow-hidden rounded-xl shadow-lg cursor-pointer">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/assets/royal_bangles_collection.png')" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h3 className="text-2xl font-serif text-white mb-2">Royal Bangles</h3>
                        <span className="text-stone-300 text-sm tracking-wide group-hover:text-amber-200 transition-colors flex items-center gap-1">Explore Set <ArrowRight className="w-4 h-4" /></span>
                    </div>
                </Link>

                {/* Card 3 - New Arrivals */}
                <Link to="/new-arrivals" className="group relative col-span-1 md:col-span-4 overflow-hidden rounded-xl shadow-lg cursor-pointer">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/assets/new_arrival_collection.png')" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h3 className="text-2xl font-serif text-white mb-2">New Arrivals</h3>
                        <span className="text-stone-300 text-sm tracking-wide group-hover:text-amber-200 transition-colors flex items-center gap-1">Fresh from Looms <ArrowRight className="w-4 h-4" /></span>
                    </div>
                </Link>

                {/* Card 4 - Festive */}
                <Link to="/shop?collection=festive" className="group relative col-span-1 md:col-span-8 overflow-hidden rounded-xl shadow-lg cursor-pointer">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/assets/festive_collection.png')" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <h3 className="text-3xl md:text-3xl font-serif text-white mb-2 italic">Festive Collections</h3>
                        <p className="text-stone-200 font-light max-w-md hidden md:block">Celebrate with colors that resonate with the spirit of Indian festivals.</p>
                        <div className="w-12 h-0.5 bg-amber-400 mt-4 group-hover:w-24 transition-all duration-300" />
                    </div>
                </Link>
            </div>
        </div>
    </section>
);

const NewArrivalsSection = () => {
    const { products, loading } = useProduct();
    const newArrivals = products.slice(0, 4);

    if (loading) return null;

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto bg-stone-50/50">
            <div className="text-center mb-16 relative">
                <span className="text-amber-800/60 uppercase tracking-widest text-xs font-bold">Curated Excellence</span>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 mb-6">Latest Masterpieces</h2>
                <div className="w-24 h-[1px] bg-amber-800/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {newArrivals.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-200 mb-6 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <img
                                src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500?text=Saree'}
                                alt={product.name}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x500?text=Saree'; }}
                                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Hover Reveal Actions */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-between items-center">
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-800">show now</span>
                                <ShoppingBag className="w-5 h-5 text-amber-900 hover:fill-amber-900/10 cursor-pointer transition-colors" />
                            </div>

                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-900 text-[10px] uppercase font-bold px-3 py-1 tracking-widest shadow-sm">
                                {product.isNew ? 'New Arrival' : 'Handcrafted'}
                            </div>
                        </div>

                        <div className="text-center group-hover:text-amber-800 transition-colors">
                            <h3 className="text-lg font-serif text-gray-900 mb-1 leading-snug">
                                {product.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-500">₹{product.price?.toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-16">
                <Link to="/new-arrivals" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-amber-800 border-b border-gray-900 hover:border-amber-800 pb-1 transition-all">
                    View All New Arrivals
                </Link>
            </div>
        </div>
    );
};

const HeritageStorySection = () => (
    <section className="relative py-32 px-4 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-stone-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="inline-flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-amber-800/40" />
                    <span className="text-amber-900 text-xs font-bold tracking-[0.25em] uppercase">Our Legacy</span>
                    <div className="h-[1px] w-8 bg-amber-800/40" />
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                    Woven History in <br />
                    <span className="text-amber-800 italic">Every Single Thread</span>
                </h2>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                {/* Image Column - Takes 3 columns */}
                <motion.div
                    className="lg:col-span-3"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative group">
                        {/* Offset Frame Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 to-stone-200 rounded-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                        <div className="relative overflow-hidden rounded-lg shadow-2xl">
                            <img
                                src="/assets/weaving_heritage.png"
                                alt="Master Artisan Weaving Kanchipuram Silk"
                                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-6 shadow-xl border-4 border-amber-100">
                            <div className="text-center">
                                <div className="text-3xl font-serif font-bold text-amber-900">50+</div>
                                <div className="text-xs text-gray-600 uppercase tracking-wider">Years</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Text Column - Takes 2 columns */}
                <motion.div
                    className="lg:col-span-2 flex flex-col justify-center"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-6">
                        <p className="text-gray-700 text-lg leading-relaxed font-light">
                            At Kanchi Vastra, we don't just sell sarees—we preserve a sacred art form passed down through generations of master weavers in Kanchipuram.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Every thread tells a story. From the purity of mulberry silk to the authenticity of zari, each weave is a meditation, a rhythmic prayer whispered by artisan hands.
                        </p>

                        <div className="pt-4 space-y-4">
                            {/* Feature Points */}
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-800 flex-shrink-0" />
                                <p className="text-sm text-gray-600">Handwoven by master craftsmen with 50+ years of heritage</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-800 flex-shrink-0" />
                                <p className="text-sm text-gray-600">100% pure silk with authentic Silk Mark certification</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-800 flex-shrink-0" />
                                <p className="text-sm text-gray-600">Traditional motifs preserving centuries-old techniques</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-amber-800 pb-1 hover:text-amber-900 hover:border-amber-600 transition-colors duration-300 uppercase tracking-widest"
                            >
                                Discover Our Story
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

const BanglesHighlightSection = () => (
    <section className="py-24 px-4 bg-[#fcfbf9] overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image Composition */}
                <div className="relative order-2 lg:order-1 group cursor-pointer p-4">
                    {/* Abstract Edge Accents */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-600/30 rounded-tl-3xl transition-all duration-500 group-hover:w-[95%] group-hover:h-[95%]" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-600/30 rounded-br-3xl transition-all duration-500 group-hover:w-[95%] group-hover:h-[95%]" />

                    {/* Main Image Container with Frame */}
                    <Link to="/bangles" className="relative block z-10 overflow-hidden shadow-2xl aspect-[5/4] rounded-2xl border-[6px] border-white ring-1 ring-stone-900/5">
                        <img
                            src="/assets/premium_bangles.png"
                            alt="Royal Kanchipuram Bangles"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                        {/* Inner Vignette & Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </Link>
                </div>

                {/* Text Content */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 border border-amber-900/20 rounded-full text-amber-900 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            Adornments of Grace
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                            Handcrafted <br />
                            <span className="text-amber-700 italic">Heritage Bangles</span>
                        </h2>
                        <div className="w-24 h-[1px] bg-amber-800/30 mb-8 mx-auto lg:mx-0" />
                        <p className="text-gray-600 text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                            Complete your ensemble with the divine shimmer of our handcrafted bangles.
                            Each piece is a masterpiece, designed to echo the grandeur of your silk drape
                            and whisper stories of timeless tradition.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/bangles"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-medium tracking-widest uppercase hover:bg-amber-900 transition-colors duration-300 shadow-xl shadow-gray-900/10"
                            >
                                Shop Collection
                            </Link>
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-gray-900 text-sm font-medium tracking-widest uppercase hover:border-amber-900 hover:text-amber-900 transition-colors duration-300 bg-white"
                            >
                                View All
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);



const NewsletterSection = () => (
    <section className="relative py-24 px-4 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-10 right-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-20 w-80 h-80 bg-stone-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-amber-800/40" />
                        <span className="text-amber-900 text-xs font-bold tracking-[0.25em] uppercase">Stay Connected</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                        Join Our <br />
                        <span className="text-amber-800 italic">Inner Circle</span>
                    </h2>

                    <p className="text-gray-600 text-lg font-light leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                        Be the first to discover our exclusive silk collections, artisan stories, and private sales.
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                            <span className="text-sm text-gray-600">Early access to new collections</span>
                        </div>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                            <span className="text-sm text-gray-600">Exclusive member-only offers</span>
                        </div>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                            <span className="text-sm text-gray-600">Behind-the-scenes artisan stories</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-stone-200">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-6 py-4 border-2 border-stone-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                                    Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-6 py-4 border-2 border-stone-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 px-8 rounded-lg font-medium uppercase tracking-widest text-sm hover:bg-amber-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
                            >
                                Subscribe Now
                            </button>

                            <p className="text-xs text-gray-500 text-center leading-relaxed">
                                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                            </p>
                        </form>
                    </div>

                    {/* Decorative Corner Accent */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-amber-300/30 rounded-lg -z-10" />
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-stone-300/30 rounded-lg -z-10" />
                </motion.div>
            </div>
        </div>
    </section>
);

const Home = () => {
    return (
        <div className="bg-white overflow-hidden">
            <HeroSection />
            <FeaturesSection />
            <CategoriesSection />
            <NewArrivalsSection />
            <HeritageStorySection />
            <BanglesHighlightSection />
            <NewsletterSection />
        </div>
    );
};

export default Home;
