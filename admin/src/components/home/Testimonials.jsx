import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Section from '../common/Section';

const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Mumbai',
        rating: 5,
        text: 'The quality of the Kanchipuram silk saree I purchased is absolutely stunning. The intricate work and the rich colors exceeded my expectations. Perfect for my sister\'s wedding!',
        image: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 2,
        name: 'Ananya Reddy',
        location: 'Hyderabad',
        rating: 5,
        text: 'Kanchi Vastra has become my go-to destination for traditional wear. The blouse collection is exquisite, and the customer service is exceptional. Highly recommended!',
        image: 'https://i.pravatar.cc/150?img=5'
    },
    {
        id: 3,
        name: 'Meera Patel',
        location: 'Bangalore',
        rating: 5,
        text: 'I ordered a wedding saree and was blown away by the craftsmanship. Each thread tells a story of tradition and elegance. Worth every penny!',
        image: 'https://i.pravatar.cc/150?img=9'
    },
    {
        id: 4,
        name: 'Divya Krishnan',
        location: 'Chennai',
        rating: 5,
        text: 'The attention to detail in every piece is remarkable. I love how they blend traditional designs with modern aesthetics. My entire family shops here now!',
        image: 'https://i.pravatar.cc/150?img=10'
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <Section className="bg-gradient-to-br from-cream-50 to-cream-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-gold-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-600 uppercase tracking-[0.3em] text-sm font-medium mb-4 block"
                    >
                        Customer Love
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-gray-900 mb-6"
                    >
                        What Our Customers Say
                    </motion.h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-xl p-12 md:p-16 relative"
                        >
                            <Quote className="absolute top-8 left-8 text-gold-200 w-16 h-16" />

                            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-20 h-20 rounded-full object-cover ring-4 ring-gold-200"
                                />
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-serif text-gray-900 mb-1">
                                        {testimonials[currentIndex].name}
                                    </h3>
                                    <p className="text-gray-500 mb-2">{testimonials[currentIndex].location}</p>
                                    <div className="flex gap-1 justify-center md:justify-start">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 text-lg leading-relaxed italic relative z-10">
                                "{testimonials[currentIndex].text}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all duration-300 group"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all duration-300 group"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-gold-600' : 'w-2 bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Testimonials;
