import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { ArrowRight, Star, Truck, ShieldCheck, Clock, ShoppingBag } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Hero Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-amber-200 uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-medium"
                >
                    Traditional Elegance
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
                >
                    Kanchi Vastra
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 font-light"
                >
                    Discover the timeless beauty of handwoven silk sarees, crafted with passion and heritage for the modern woman.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link
                        to="/shop"
                        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white border border-white/30 rounded-full transition-all duration-300 hover:bg-white hover:text-red-900 shadow-lg hover:shadow-white/20"
                    >
                        <span className="mr-2 tracking-wide">Explore Collection</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-12 bg-white/30 mx-auto overflow-hidden">
                    <div className="w-full h-1/2 bg-white animate-rain-drop" />
                </div>
            </motion.div>
        </div>
    );
};

const CategoryCard = ({ title, image, link }) => (
    <Link to={link} className="group relative h-96 w-full overflow-hidden rounded-lg shadow-xl cursor-pointer">
        <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
            <div className="flex items-center text-amber-200 text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Shop Now <ArrowRight className="ml-2 w-4 h-4" />
            </div>
        </div>
    </Link>
);

const FeaturesSection = () => {
    const features = [
        { icon: Truck, title: "Free Shipping", desc: "On all orders over ₹5000" },
        { icon: ShieldCheck, title: "Authentic Quality", desc: "Certified Silk Mark" },
        { icon: Clock, title: "24/7 Support", desc: "Dedicated customer service" },
        { icon: Star, title: "Premium Collection", desc: "Handpicked exclusive designs" },
    ];

    return (
        <div className="bg-stone-50 py-16 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100"
                    >
                        <div className="p-4 rounded-full bg-amber-50 text-amber-900 mb-4">
                            <feature.icon className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-serif font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const NewArrivalsSection = () => {
    const { products, loading } = useProduct();
    // Assuming products are sorted by date or taking the last few
    const newArrivals = products.slice(0, 4);

    if (loading) return <div className="py-20 text-center">Loading luxury...</div>;

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-amber-800 uppercase tracking-widest text-xs font-semibold">Fresh from the Looms</span>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3 mb-6">New Arrivals</h2>
                <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {newArrivals.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
                            <img
                                src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500?text=Saree'}
                                alt={product.name}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x500?text=Saree'; }}
                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-md translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                <ShoppingBag className="w-5 h-5 text-gray-800" />
                            </div>
                            {product.isNew && (
                                <div className="absolute top-4 left-4 bg-red-800 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-sm tracking-widest">
                                    New
                                </div>
                            )}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 font-serif group-hover:text-amber-800 transition-colors">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 font-medium">₹{product.price?.toLocaleString()}</p>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/new-arrivals" className="inline-block border-b-2 border-gray-900 pb-1 text-sm font-semibold uppercase tracking-widest hover:text-amber-800 hover:border-amber-800 transition-all">
                    View All New Arrivals
                </Link>
            </div>
        </div>
    );
};

const NewsletterSection = () => (
    <div className="relative bg-amber-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots" />
        <div className="relative max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Join the Royal Circle</h2>
            <p className="text-amber-100 mb-10 text-lg font-light">
                Subscribe to receive updates on new collections, exclusive offers, and styling tips directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="Your Email Address"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-white text-amber-900 font-semibold rounded-full hover:bg-amber-100 transition-colors shadow-lg">
                    Subscribe
                </button>
            </form>
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="bg-white overflow-hidden">
            <HeroSection />
            <FeaturesSection />

            {/* Categories Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <CategoryCard
                            title="Kanchipuram Silk"
                            image="https://images.unsplash.com/photo-1621619867342-c94158156156?q=80&w=800&auto=format&fit=crop"
                            link="/shop?category=Kanchipuram"
                        />
                        <CategoryCard
                            title="Bridal Collection"
                            image="https://images.unsplash.com/photo-1610030469668-965d35eb11b6?q=80&w=800&auto=format&fit=crop"
                            link="/shop?category=Bridal"
                        />
                    </div>
                    <div className="space-y-8 md:pt-16">
                        <CategoryCard
                            title="Banarasi Silk"
                            image="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop"
                            link="/shop?category=Banarasi"
                        />
                        <CategoryCard
                            title="Desginer Sarees"
                            image="https://images.unsplash.com/photo-1596234135541-c1e09564f2fb?q=80&w=800&auto=format&fit=crop"
                            link="/shop"
                        />
                    </div>
                </div>
            </section>

            <NewArrivalsSection />
            <NewsletterSection />
        </div>
    );
};

export default Home;

