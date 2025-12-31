import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
    const { user } = useAuth();
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Kanchi Vastra</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            Weaving tradition into contemporary elegance. Discover the finest collection of authentic sarees.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-cream-100 rounded-full text-gray-600 hover:bg-gold-500 hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-cream-100 rounded-full text-gray-600 hover:bg-gold-500 hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-cream-100 rounded-full text-gray-600 hover:bg-gold-500 hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'About Us', path: '/about' },
                                { name: 'Collections', path: '/shop' },
                                { name: 'New Arrivals', path: '/new-arrivals' },
                                { name: 'Contact Us', path: '/contact' },
                                ...(user && user.role === 'admin' ? [{ name: 'Admin Panel', path: '/admin', external: true }] : [])
                            ].map((item) => (
                                <li key={item.name}>
                                    {item.external ? (
                                        <a href={item.path} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold-600 transition-colors">
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link to={item.path} className="text-gray-500 hover:text-gold-600 transition-colors">
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-gray-900 mb-6">Customer Care</h4>
                        <ul className="space-y-4">
                            {['Shipping Policy', 'Returns & Exchange', 'Terms of Service', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <Link to="/" className="text-gray-500 hover:text-gold-600 transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-gray-900 mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-3 text-gold-500 mt-1" />
                                <span className="text-gray-500">123 Tradition Street, Kanchipuram, Tamil Nadu, India</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-3 text-gold-500" />
                                <span className="text-gray-500">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-3 text-gold-500" />
                                <span className="text-gray-500">hello@kanchivastra.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Kanchi Vastra. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
