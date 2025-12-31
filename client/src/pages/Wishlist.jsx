import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    const handleRemove = (product) => {
        removeFromWishlist(product.id);
        addToast(`Removed ${product.name} from wishlist`, 'info');
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-full shadow-lg mb-6"
                >
                    <Heart size={48} className="text-gray-300" />
                </motion.div>
                <h2 className="text-3xl font-serif text-gray-900 mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    Looks like you haven't added any beautiful sarees to your wishlist yet.
                    Explore our collection and save your favorites!
                </p>
                <Link
                    to="/shop"
                    className="group flex items-center gap-2 bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition-colors shadow-md"
                >
                    <span>Start Shopping</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-serif text-gray-900">
                        My Wishlist <span className="text-gray-400 text-2xl font-sans">({wishlist.length})</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {wishlist.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={product.image || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <button
                                            onClick={() => handleRemove(product)}
                                            className="bg-white/90 p-2 rounded-full text-gray-500 hover:text-red-600 transition-colors shadow-sm"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button
                                            onClick={() => handleMoveToCart(product)}
                                            className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium shadow-lg hover:bg-gold-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag size={18} />
                                            Move to Cart
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    {product.category && (
                                        <p className="text-xs text-gold-600 uppercase tracking-widest mb-1">
                                            {product.category}
                                        </p>
                                    )}
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="font-serif text-lg text-gray-900 truncate hover:text-gold-600 transition-colors mb-2">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">₹{product.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
