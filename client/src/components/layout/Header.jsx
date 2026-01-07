import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Bangles', path: '/bangles' },
        { name: 'About', path: '/about' }
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setIsSearchOpen(false);
    };

    const isHome = location.pathname === '/';
    const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

    const navTextColor = isTransparent ? 'text-white' : 'text-charcoal-700';
    const logoColor = isTransparent ? 'text-white' : 'text-maroon-800';
    const iconColor = isTransparent ? 'text-white' : 'text-maroon-900';

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            <header
                className={`w-full transition-all duration-500 relative border-b ${isScrolled
                    ? 'py-2 bg-white/80 backdrop-blur-lg shadow-sm border-gray-100'
                    : isTransparent
                        ? 'py-5 bg-transparent border-transparent'
                        : 'py-5 bg-white/40 backdrop-blur-md border-gray-100/20'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 transition-all duration-500">
                    <div className="flex justify-between items-center">
                        {/* Mobile Menu Button - Left */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`md:hidden p-1 ${iconColor}`}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} strokeWidth={1.5} />
                        </motion.button>

                        {/* Logo */}
                        <Link to="/" className="flex flex-col items-center group">
                            <motion.span
                                className={`font-cormorant font-bold uppercase tracking-[0.2em] transition-all duration-500 ${logoColor} ${isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'
                                    }`}
                                layout
                            >
                                Kanchi Vastra
                            </motion.span>
                            {!isScrolled && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`text-[10px] tracking-[0.4em] uppercase mt-1 font-medium transition-colors duration-500 ${isTransparent ? 'text-gold-200' : 'text-gold-600'}`}
                                >
                                    Collections
                                </motion.span>
                            )}
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-12 items-center">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative group py-2 text-xs lg:text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${location.pathname === item.path
                                        ? (isTransparent ? 'text-gold-300' : 'text-maroon-700')
                                        : `${navTextColor} hover:text-gold-500`
                                        }`}
                                >
                                    <span>{item.name}</span>
                                    <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold-400 origin-right transition-transform duration-300 scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${location.pathname === item.path ? 'scale-x-100' : ''
                                        }`} />
                                </Link>
                            ))}
                        </nav>

                        {/* Icons - Right */}
                        <div className="flex items-center space-x-3 md:space-x-5">
                            {/* Search */}
                            <div className="flex items-center group">
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <motion.form
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 180, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            onSubmit={handleSearchSubmit}
                                            className="mr-2 overflow-hidden"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search Heritage..."
                                                className={`w-full bg-transparent border-b px-2 py-1 text-xs focus:outline-none focus:border-gold-500 italic font-serif ${isTransparent ? 'border-white/40 text-white placeholder:text-white/60' : 'border-maroon-200 text-maroon-900 placeholder:text-maroon-400'
                                                    }`}
                                                autoFocus
                                            />
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                                <motion.button
                                    whileHover={{ scale: 1.1, color: '#C29D2D' }}
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className={`${iconColor} transition-colors p-1.5`}
                                >
                                    {isSearchOpen ? <X size={22} strokeWidth={1.2} /> : <Search size={22} strokeWidth={1.2} />}
                                </motion.button>
                            </div>

                            {/* Wishlist */}
                            <Link to="/wishlist" className="relative group p-1.5">
                                <motion.div
                                    whileHover={{ scale: 1.1, color: '#C29D2D' }}
                                    className={iconColor}
                                >
                                    <Heart size={22} strokeWidth={1.2} />
                                </motion.div>
                                {wishlistCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-0 right-0 bg-gold-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm"
                                    >
                                        {wishlistCount}
                                    </motion.span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className="relative group p-1.5">
                                <motion.div
                                    whileHover={{ scale: 1.1, color: '#C29D2D' }}
                                    className={iconColor}
                                >
                                    <ShoppingBag size={22} strokeWidth={1.2} />
                                </motion.div>
                                {totalItems > 0 && (
                                    <motion.span
                                        key={totalItems}
                                        initial={{ scale: 0, y: 5 }}
                                        animate={{ scale: 1, y: 0 }}
                                        className={`absolute top-0 right-0 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm ${isTransparent ? 'bg-maroon-500' : 'bg-maroon-700'}`}
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </Link>

                            {/* User - Hidden on mobile */}
                            <Link to="/account" className="hidden md:block p-1.5">
                                <motion.div
                                    whileHover={{ scale: 1.1, color: '#C29D2D' }}
                                    className={iconColor}
                                >
                                    <User size={22} strokeWidth={1.2} />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-maroon-950/40 backdrop-blur-sm z-[65]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 bg-white z-[70] w-full max-w-[300px] shadow-2xl flex flex-col"
                        >
                            <div className="p-8 flex justify-between items-center bg-cream-50">
                                <span className="text-xl font-cormorant font-bold tracking-widest text-maroon-900 uppercase">Kanchi Vastra</span>
                                <button
                                    className="text-maroon-900 p-2 hover:bg-maroon-50 rounded-full transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-8">
                                <nav className="flex flex-col">
                                    {navigation.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={item.path}
                                                className={`px-8 py-4 text-sm font-medium uppercase tracking-widest flex items-center justify-between border-b border-gray-50 hover:bg-cream-50/50 transition-colors ${location.pathname === item.path ? 'text-maroon-700 bg-cream-50' : 'text-gray-600'
                                                    }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <span>{item.name}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-8 bg-cream-50 space-y-6">
                                <div className="flex justify-around">
                                    <Link to="/wishlist" className="flex flex-col items-center gap-1 text-maroon-900" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Heart size={20} strokeWidth={1.5} />
                                        <span className="text-[10px] uppercase tracking-tighter">Wishlist</span>
                                    </Link>
                                    <Link to="/account" className="flex flex-col items-center gap-1 text-maroon-900" onClick={() => setIsMobileMenuOpen(false)}>
                                        <User size={20} strokeWidth={1.5} />
                                        <span className="text-[10px] uppercase tracking-tighter">Account</span>
                                    </Link>
                                    <Link to="/cart" className="flex flex-col items-center gap-1 text-maroon-900" onClick={() => setIsMobileMenuOpen(false)}>
                                        <ShoppingBag size={20} strokeWidth={1.5} />
                                        <span className="text-[10px] uppercase tracking-tighter">Cart</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
