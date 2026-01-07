import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
    const { user } = useAuth();
    return (
        <footer className="bg-[#1c1917] pt-24 pb-12 border-t border-amber-900/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-3xl font-serif text-white mb-6">Kanchi Vastra</h3>
                        <p className="text-stone-400 mb-8 leading-relaxed font-light">
                            Weaving tradition into contemporary elegance. Discover the finest collection of authentic sarees and handcrafted jewelry.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-3 bg-white/5 rounded-full text-stone-400 hover:bg-amber-700 hover:text-white transition-all duration-300 border border-white/5 hover:border-amber-600">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-3 bg-white/5 rounded-full text-stone-400 hover:bg-amber-700 hover:text-white transition-all duration-300 border border-white/5 hover:border-amber-600">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-3 bg-white/5 rounded-full text-stone-400 hover:bg-amber-700 hover:text-white transition-all duration-300 border border-white/5 hover:border-amber-600">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg text-amber-500 mb-8 tracking-wide">Quick Links</h4>
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
                                        <a href={item.path} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-400 transition-colors duration-300 font-light text-sm tracking-wide">
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link to={item.path} className="text-stone-400 hover:text-amber-400 transition-colors duration-300 font-light text-sm tracking-wide">
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="font-serif text-lg text-amber-500 mb-8 tracking-wide">Customer Care</h4>
                        <ul className="space-y-4">
                            {['Shipping Policy', 'Returns & Exchange', 'Terms of Service', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <Link to="/" className="text-stone-400 hover:text-amber-400 transition-colors duration-300 font-light text-sm tracking-wide">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg text-amber-500 mb-8 tracking-wide">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-4 text-amber-600 mt-1 flex-shrink-0" />
                                <span className="text-stone-400 font-light leading-relaxed">r.no 11, KLR Venture, Medchal,<br />Telangana, India - 501401</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-4 text-amber-600 flex-shrink-0" />
                                <span className="text-stone-400 font-light">+91 9494572676</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-4 text-amber-600 flex-shrink-0" />
                                <span className="text-stone-400 font-light">aaradhana7571@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-600 text-sm">
                        &copy; {new Date().getFullYear()} Kanchi Vastra. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-stone-600 text-xs uppercase tracking-wider">Privacy</span>
                        <span className="text-stone-600 text-xs uppercase tracking-wider">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
