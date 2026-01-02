import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white text-stone-800 font-sans">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">About Kanchi Vastra</h1>
                    <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/5]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80"
                            alt="Kanchi Vastra Shop"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Shop Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-serif text-stone-900 border-b border-gray-200 pb-2">Our Story</h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Welcome to <strong>Kanchi Vastra</strong>, your premier destination for authentic Kanchipuram silk sarees.
                            Established with a passion for preserving India's rich weaving heritage, we bring you handpicked collections
                            straight from the master weavers of Kanchipuram.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Our shop is dedicated to quality and authenticity. Each saree in our collection is a masterpiece,
                            woven with pure mulberry silk and high-quality zari, ensuring that you receive not just a garment,
                            but a piece of art that lasts for generations.
                        </p>

                        <div className="pt-6 space-y-4">
                            <h3 className="text-xl font-serif text-stone-900">Visit Our Store</h3>

                            <div className="flex items-start space-x-4 text-gray-600">
                                <MapPin className="w-6 h-6 text-gold-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-stone-800">Kanchi Vastra Collections</p>
                                    <p>r.no 11,KLR Venture,Medchal</p>
                                    <p>Telangana, India - 501401</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 text-gray-600">
                                <Clock className="w-6 h-6 text-gold-600 flex-shrink-0" />
                                <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                            </div>

                            <div className="flex items-center space-x-4 text-gray-600">
                                <Phone className="w-6 h-6 text-gold-600 flex-shrink-0" />
                                <p>+91 9494572676</p>
                            </div>

                            <div className="flex items-center space-x-4 text-gray-600">
                                <Mail className="w-6 h-6 text-gold-600 flex-shrink-0" />
                                <p>aaradhana7571@gmail.com</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default About;
