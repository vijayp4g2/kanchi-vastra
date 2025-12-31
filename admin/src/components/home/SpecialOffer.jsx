import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialOffer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 15,
        minutes: 30,
        seconds: 45
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeBox = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 min-w-[70px] md:min-w-[100px]">
                <span className="text-3xl md:text-5xl font-bold text-gray-900 font-serif">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-white/90 text-xs md:text-sm uppercase tracking-wider mt-2 font-medium">
                {label}
            </span>
        </div>
    );

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600" />

            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Tag className="w-5 h-5 text-white" />
                            <span className="text-white uppercase tracking-[0.2em] text-sm font-medium">
                                Limited Time Offer
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight">
                            Festive Season Sale
                        </h2>
                        <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
                            Get up to <span className="font-bold text-3xl md:text-4xl">40% OFF</span> on selected collections
                        </p>
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Clock className="w-6 h-6 text-white" />
                            <span className="text-white text-lg font-medium">Offer Ends In</span>
                        </div>

                        <div className="flex justify-center gap-3 md:gap-6">
                            <TimeBox value={timeLeft.days} label="Days" />
                            <div className="text-white text-4xl md:text-6xl font-bold self-start mt-4 md:mt-6">:</div>
                            <TimeBox value={timeLeft.hours} label="Hours" />
                            <div className="text-white text-4xl md:text-6xl font-bold self-start mt-4 md:mt-6">:</div>
                            <TimeBox value={timeLeft.minutes} label="Minutes" />
                            <div className="text-white text-4xl md:text-6xl font-bold self-start mt-4 md:mt-6">:</div>
                            <TimeBox value={timeLeft.seconds} label="Seconds" />
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-white text-gray-900 px-10 py-5 rounded-full font-semibold text-lg flex items-center gap-3 hover:shadow-2xl transition-all duration-300"
                            >
                                Shop Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                            >
                                View Collections
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <div className="text-white">
                            <div className="text-3xl font-bold mb-2">Free Shipping</div>
                            <p className="text-white/80">On orders above ₹2,999</p>
                        </div>
                        <div className="text-white">
                            <div className="text-3xl font-bold mb-2">Easy Returns</div>
                            <p className="text-white/80">7-day return policy</p>
                        </div>
                        <div className="text-white">
                            <div className="text-3xl font-bold mb-2">Secure Payment</div>
                            <p className="text-white/80">100% safe & secure</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;
