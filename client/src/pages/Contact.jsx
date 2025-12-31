import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-32 min-h-screen bg-[#FDFBF7]">
            {/* Header Section */}
            <div className="container mx-auto px-6 mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
                >
                    We’d love to hear from you. Whether you have a question about our collections, customized orders, or anything else, our team is ready to answer all your questions.
                </motion.p>
            </div>

            <div className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Visual & Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1540932296235-d84c1592ab7b?auto=format&fit=crop&q=80&w=1000"
                                alt="Contact Support"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <div>
                                    <h3 className="text-white text-2xl font-serif font-bold mb-2">Visit Our Boutique</h3>
                                    <p className="text-white/90">Experience the elegance of Kanjivaram firsthand.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ContactInfoCard
                                icon={<Mail size={24} />}
                                title="Email Us"
                                content="support@kanchivastra.com"
                                subContent="Response within 24 hours"
                            />
                            <ContactInfoCard
                                icon={<Phone size={24} />}
                                title="Call Us"
                                content="+91 98765 43210"
                                subContent="Mon-Sat, 9am - 7pm"
                            />
                            <ContactInfoCard
                                icon={<MapPin size={24} />}
                                title="Location"
                                content="123, Silk Street, Kanchipuram"
                                subContent="Tamil Nadu, India"
                            />
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center items-center gap-4">
                                <h4 className="font-serif font-bold text-gray-900">Follow Us</h4>
                                <div className="flex gap-4">
                                    <SocialLink icon={<Instagram size={20} />} />
                                    <SocialLink icon={<Facebook size={20} />} />
                                    <SocialLink icon={<Twitter size={20} />} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100"
                    >
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Send us a Message</h2>
                        <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all bg-stone-50 focus:bg-white" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all bg-stone-50 focus:bg-white" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all bg-stone-50 focus:bg-white" placeholder="jane@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Subject</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all bg-stone-50 focus:bg-white">
                                    <option>General Inquiry</option>
                                    <option>Order Status</option>
                                    <option>Customization Request</option>
                                    <option>Returns & Exchanges</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all bg-stone-50 focus:bg-white resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gold-600 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const ContactInfoCard = ({ icon, title, content, subContent }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-serif font-bold text-gray-900">{title}</h4>
            <p className="text-gray-900 font-medium mt-1">{content}</p>
            <p className="text-sm text-gray-500">{subContent}</p>
        </div>
    </div>
);

const SocialLink = ({ icon }) => (
    <button className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gold-500 hover:text-white transition-all">
        {icon}
    </button>
);

export default Contact;
