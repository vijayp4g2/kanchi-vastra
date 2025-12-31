import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';



const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isTransparent = isHome && !isScrolled && !isMobileMenuOpen && !activeDropdown;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dynamic styles based on state
    const headerBgClass = isTransparent
        ? 'bg-transparent border-transparent'
        : 'bg-white/95 backdrop-blur-md shadow-md border-gray-100';

    const textColorClass = isTransparent ? 'text-white' : 'text-gray-800';
    const logoColorClass = isTransparent ? 'text-white' : 'text-red-900';
    const hoverColorClass = isTransparent ? 'hover:text-gold-200' : 'hover:text-red-800';
    const iconColorClass = isTransparent ? 'text-white' : 'text-gray-800';

    const navigation = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Bangles', path: '/bangles' },
        { name: 'About', path: '/about' }
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Implement search logic here
        setIsSearchOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">


            <header
                className={`w-full transition-all duration-300 relative border-b ${headerBgClass} ${isScrolled ? 'py-2' : 'py-4'}`}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-center">
                        {/* Mobile Menu Button - Left */}
                        <button
                            className={`md:hidden p-1 ${iconColorClass}`}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} strokeWidth={1.5} />
                        </button>

                        {/* Logo */}
                        <Link to="/" className={`text-2xl md:text-3xl font-serif font-bold tracking-wide transition-colors ${logoColorClass}`}>
                            Kanchi Vastra
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-10 items-center">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => item.type === 'dropdown' && setActiveDropdown(item.name)}
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center space-x-1 font-medium transition-colors text-sm uppercase tracking-wide py-2 ${textColorClass} ${hoverColorClass}`}
                                    >
                                        <span>{item.name}</span>
                                    </Link>


                                </div>
                            ))}
                        </nav>

                        {/* Icons - Right */}
                        <div className="flex items-center space-x-4 md:space-x-6">
                            {/* Search */}
                            <div className="flex items-center">
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <motion.form
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 200, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            onSubmit={handleSearchSubmit}
                                            className="mr-2 overflow-hidden"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="w-full bg-white/90 border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-red-300 text-gray-800"
                                                autoFocus
                                            />
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className={`${iconColorClass} ${hoverColorClass} transition-colors p-1`}
                                >
                                    {isSearchOpen ? <X size={20} /> : <Search size={20} strokeWidth={1.5} />}
                                </button>
                            </div>

                            {/* Wishlist */}
                            <Link to="/wishlist" className={`hidden md:block ${iconColorClass} ${hoverColorClass} transition-colors p-1 relative group`}>
                                <Heart size={20} strokeWidth={1.5} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className={`${iconColorClass} ${hoverColorClass} transition-colors p-1 relative`}>
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User */}
                            <Link to="/account" className={`hidden md:block ${iconColorClass} ${hoverColorClass} transition-colors p-1`}>
                                <User size={20} strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col w-[80%] max-w-sm shadow-2xl"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-gray-100">
                            <span className="text-xl font-serif font-bold text-red-900">Menu</span>
                            <button
                                className="text-gray-500 hover:text-red-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <nav className="flex flex-col space-y-6">
                                {navigation.map((item) => (
                                    <div key={item.name} className="flex flex-col">
                                        <Link
                                            to={item.path}
                                            className="text-lg font-medium text-gray-900 hover:text-red-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex flex-col space-y-4">
                                <Link to="/wishlist" className="flex items-center space-x-3 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Heart size={20} />
                                    <span>Wishlist</span>
                                </Link>
                                <Link to="/account" className="flex items-center space-x-3 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                                    <User size={20} />
                                    <span>My Account</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop for Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-[55] backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Header;
