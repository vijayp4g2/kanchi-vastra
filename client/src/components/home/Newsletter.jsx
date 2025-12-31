import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setEmail('');
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-cream-100 to-purple-100" />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold-300/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg">
                            <Sparkles className="w-5 h-5 text-gold-600" />
                            <span className="text-gold-600 uppercase tracking-[0.2em] text-sm font-medium">
                                Exclusive Offers
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                            Join Our Elegant Circle
                        </h2>
                        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Subscribe to receive exclusive updates, early access to new collections, and special offers crafted just for you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12"
                    >
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                        className="w-full pl-14 pr-6 py-5 rounded-full border-2 border-gray-200 focus:border-gold-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-10 py-5 rounded-full font-medium flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 group"
                                >
                                    Subscribe
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-serif text-gray-900 mb-2">Thank You!</h3>
                                <p className="text-gray-600">You've successfully subscribed to our newsletter.</p>
                            </motion.div>
                        )}

                        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Exclusive Deals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Early Access</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>No Spam</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
