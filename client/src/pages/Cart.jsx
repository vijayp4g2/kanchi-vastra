import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    const SHIPPING_COST = 0; // Free shipping for now
    const finalTotal = totalPrice + SHIPPING_COST;

    const handleWhatsAppCheckout = () => {
        const phoneNumber = "919494572676";
        let message = "Hello, I would like to place an order for the following items:\n\n";

        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n   Quantity: ${item.quantity}\n   Price: ₹${(item.price * item.quantity).toLocaleString()}\n\n`;
        });

        message += `*Total Amount: ₹${finalTotal.toLocaleString()}*\n\nPlease confirm my order.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 px-4 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-full shadow-xl mb-6 ring-1 ring-gray-100"
                >
                    <ShoppingBag size={48} className="text-gray-300" />
                </motion.div>
                <h2 className="text-3xl font-serif text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    It looks like you haven't added any items to your cart yet.
                    Browse our collection of exquisite silk sarees to find your perfect match.
                </p>
                <Link
                    to="/shop"
                    className="group flex items-center gap-2 bg-red-800 text-white px-8 py-3 rounded-xl hover:bg-red-900 transition-all shadow-lg hover:shadow-red-900/20"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Continue Shopping</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8">
                    Your Shopping Cart
                    <span className="text-gray-400 text-2xl font-sans ml-3">({cart.length} items)</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="flex-grow space-y-6">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center"
                                >
                                    {/* Product Image */}
                                    <Link to={`/product/${item.id}`} className="block shrink-0 w-full md:w-32 aspect-[3/4] md:aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
                                        <img
                                            src={item.image || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                            alt={item.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                                            }}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex-grow w-full">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                            <div>
                                                <p className="text-xs text-gold-600 uppercase tracking-widest font-medium mb-1">
                                                    {item.category}
                                                </p>
                                                <Link to={`/product/${item.id}`} className="block">
                                                    <h3 className="font-serif text-xl text-gray-900 hover:text-gold-600 transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">Free Size • Silk Mark Certified</p>
                                            </div>
                                            <div className="font-serif text-xl font-medium text-gray-900 mt-2 md:mt-0">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                            <div className="flex items-center gap-6">
                                                {/* Quantity Control */}
                                                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-l-lg transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-10 text-center text-sm font-medium text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-r-lg transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                    <span className="hidden sm:inline">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-96 shrink-0">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="font-serif text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 text-sm text-gray-600 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-4 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="font-serif text-lg text-gray-900">Total</span>
                                        <span className="font-serif text-2xl font-bold text-gray-900">
                                            ₹{finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-right">Including all taxes</p>
                                </div>

                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium shadow-xl hover:bg-gold-600 hover:shadow-gold-500/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <span>Buy Now</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-2">
                                    <ShieldCheck className="text-gold-600" size={24} />
                                    <span className="text-xs font-medium text-gray-900">Secure Payment</span>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-2">
                                    <Truck className="text-gold-600" size={24} />
                                    <span className="text-xs font-medium text-gray-900">Fast Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
