import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';

const QuickViewModal = () => {
    const { isOpen, selectedProduct, closeQuickView } = useQuickView();
    const { addToCart } = useCart();

    if (!selectedProduct) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeQuickView}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeQuickView}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} className="text-gray-900" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Image Section */}
                            <div className="relative h-[400px] md:h-full bg-gray-100">
                                <img
                                    src={selectedProduct.image || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                    alt={selectedProduct.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                                    }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    {selectedProduct.isNewArrival && (
                                        <span className="bg-white/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest font-medium rounded-full">
                                            New Arrival
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                                <div className="mb-6">
                                    <span className="text-gold-600 text-sm font-medium tracking-widest uppercase">
                                        {selectedProduct.category}
                                    </span>
                                    <h2 className="text-3xl font-serif text-gray-900 mt-2 mb-3">
                                        {selectedProduct.name}
                                    </h2>
                                    <div className="flex items-center gap-4 mb-4">
                                        <p className="text-2xl font-medium text-gray-900">
                                            ₹{selectedProduct.price.toLocaleString()}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} size={14} className="fill-gold-400 text-gold-400" />
                                            ))}
                                            <span className="text-xs text-gray-400 ml-1">(12 reviews)</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                                        Experience the timeless elegance of this handwoven masterpiece.
                                        Crafted with precision and care, this {selectedProduct.category} embodies
                                        traditional artistry and modern sophistication.
                                    </p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                addToCart(selectedProduct);
                                                // Optional: closeQuickView(); 
                                            }}
                                            className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                                        >
                                            <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                                            Add to Cart
                                        </button>
                                        <button className="p-4 border border-gray-200 rounded-xl hover:border-gold-500 hover:text-gold-600 transition-colors">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    <Link
                                        to={`/product/${selectedProduct.id}`}
                                        onClick={closeQuickView}
                                        className="block w-full"
                                    >
                                        <button className="w-full py-4 text-gray-500 font-medium hover:text-gold-600 transition-colors flex items-center justify-center gap-2">
                                            View Full Details
                                            <ArrowRight size={16} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
