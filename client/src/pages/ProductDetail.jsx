import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, ShoppingBag, Heart, Share2, ChevronRight,
    Truck, RefreshCw, ShieldCheck, Plus, Minus, ArrowLeft
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../utils/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products } = useProduct();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('2.4');
    const [activeTab, setActiveTab] = useState('Product Details');
    const [mainImage, setMainImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isZoomed, setIsZoomed] = useState(false);
    const [selectedPack, setSelectedPack] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const bangleSizes = ['2.2', '2.4', '2.6', '2.8', '2.10'];

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // First try to find in context
                let foundProduct = products.find(p => p._id === id || p.id === id);

                if (!foundProduct) {
                    // Fallback to API fetch
                    foundProduct = await api.getProductById(id);
                }

                setProduct(foundProduct);
                if (foundProduct) {
                    // Logic to get initial main image URL
                    let initialImage = '';
                    if (foundProduct.images && foundProduct.images.length > 0) {
                        const firstImg = foundProduct.images[0];
                        initialImage = (typeof firstImg === 'object' && firstImg.url) ? firstImg.url : firstImg;
                    } else if (foundProduct.image) {
                        initialImage = foundProduct.image;
                    }
                    setMainImage(initialImage);

                    if (foundProduct.saleType === 'Pack' && foundProduct.packOptions?.length > 0) {
                        const defaultPack = foundProduct.packOptions.find(p => p.isPopular) || foundProduct.packOptions[0];
                        setSelectedPack(defaultPack);
                    }
                }

                // Find related products
                if (foundProduct && products.length > 0) {
                    const related = products
                        .filter(p => p.category === foundProduct.category && (p._id !== foundProduct._id && p.id !== foundProduct.id))
                        .slice(0, 4);
                    setRelatedProducts(related);
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id, products]);

    const handleMouseMove = (e) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setMousePos({ x, y });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 text-center flex justify-center items-center bg-stone-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600 mb-4"></div>
                    <p className="font-serif italic text-gray-500">Adorning your screen...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center bg-stone-50">
                <h2 className="text-2xl font-serif mb-4 text-maroon-700">Product Not Found</h2>
                <Link to="/shop" className="text-gold-600 hover:text-gold-700 transition-colors underline decoration-gold-300 underline-offset-4">Return to Shop</Link>
            </div>
        );
    }

    const images = product.images && product.images.length > 0
        ? product.images.map(img => (typeof img === 'object' && img.url) ? img.url : img)
        : [product.image];

    return (
        <div className="min-h-screen bg-stone-50 pt-28 pb-16">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
                <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                    <Link to="/" className="hover:text-maroon-600 transition-colors">Home</Link>
                    <ChevronRight size={12} className="text-stone-300" />
                    <Link to="/shop" className="hover:text-maroon-600 transition-colors">Shop</Link>
                    <ChevronRight size={12} className="text-stone-300" />
                    {product.category && (
                        <>
                            <Link to={`/collection/${product.category.toLowerCase()}`} className="hover:text-maroon-600 transition-colors">{product.category}</Link>
                            <ChevronRight size={12} className="text-stone-300" />
                        </>
                    )}
                    <span className="text-maroon-700 font-bold truncate max-w-[200px]">{product.name}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

                    {/* Left Side: Image Gallery (Lg: 7 cols) */}
                    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
                        {/* Thumbnails (Vertical on desktop) */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide md:w-20 lg:w-24 shrink-0">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`relative aspect-[3/4] w-20 md:w-full rounded-xl overflow-hidden border-2 transition-all shrink-0 ${mainImage === img ? 'border-maroon-500 ring-4 ring-maroon-100' : 'border-white hover:border-maroon-200'
                                        }`}
                                >
                                    <img
                                        src={img || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image Container */}
                        <div className="flex-1 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-2xl relative group cursor-zoom-in"
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <img
                                    src={mainImage || product.image || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                    alt={product.name}
                                    className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                                    style={isZoomed ? {
                                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                                    } : {}}
                                />

                                {/* Floating Action Buttons */}
                                <div className="absolute top-4 right-4 flex flex-col gap-3">
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className={`p-3 rounded-full transition-all shadow-lg backdrop-blur-md ${isInWishlist(product.id || product._id)
                                            ? 'bg-maroon-600 text-white'
                                            : 'bg-white/80 text-gray-700 hover:bg-maroon-50'
                                            }`}
                                    >
                                        <Heart size={20} fill={isInWishlist(product.id || product._id) ? "currentColor" : "none"} />
                                    </button>
                                    <button className="p-3 bg-white/80 backdrop-blur-md text-gray-700 rounded-full hover:bg-maroon-50 transition-all shadow-lg">
                                        <Share2 size={20} />
                                    </button>
                                </div>

                                {/* Label */}
                                {product.isNew && (
                                    <span className="absolute top-4 left-4 bg-maroon-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                        New Arrival
                                    </span>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Product Details (Lg: 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 flex flex-col"
                    >
                        <div className="mb-2">
                            <span className="text-maroon-600 font-bold tracking-widest text-xs uppercase bg-maroon-50 px-4 py-1.5 rounded-full inline-block">
                                {product.category || 'Exclusive'} Collection
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-4xl font-bold text-maroon-800">₹{(selectedPack ? selectedPack.price : product.price).toLocaleString()}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
                            {product.description || `Handcrafted to perfection, this ${product.category?.toLowerCase() || 'item'} represents the classic Kanchi heritage. Each detail is thoughtfully executed to provide an unmatched sense of luxury and elegance.`}
                        </p>

                        {/* Selectors */}
                        <div className="space-y-8 mb-10 border-t border-stone-200 pt-8">

                            {/* Pack Selection */}
                            {product.saleType === 'Pack' && product.packOptions && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Choose Collection Size</span>
                                        {selectedPack && <span className="text-xs text-maroon-600 font-medium">Qty: {selectedPack.bangleCount} pieces</span>}
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {product.packOptions.map((pack, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedPack(pack)}
                                                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${selectedPack === pack
                                                    ? 'border-maroon-600 bg-maroon-50/30'
                                                    : 'border-stone-100 hover:border-maroon-200 bg-white'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedPack === pack ? 'bg-maroon-600 text-white' : 'bg-stone-100 text-stone-400 group-hover:bg-maroon-100'}`}>
                                                        <ShoppingBag size={18} />
                                                    </div>
                                                    <div>
                                                        <span className={`block font-bold tracking-tight ${selectedPack === pack ? 'text-maroon-900' : 'text-gray-900'}`}>
                                                            {pack.packLabel}
                                                        </span>
                                                        <span className="text-xs text-gray-500 font-medium">
                                                            {pack.bangleCount} Hand-woven pieces
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="text-right relative z-10">
                                                    <span className={`block text-lg font-black ${selectedPack === pack ? 'text-maroon-700' : 'text-gray-900'}`}>
                                                        ₹{pack.price.toLocaleString()}
                                                    </span>
                                                    <span className="text-[10px] text-stone-400 uppercase tracking-tighter">Per Set</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection - Only show for Bangles */}
                            {product.category === 'Bangles' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Inner Diameter (Size)</span>
                                            <span className="text-[10px] text-gray-500 font-medium mt-0.5 italic">Standard Indian Sizing</span>
                                        </div>
                                        <button className="text-maroon-600 text-[10px] font-black uppercase tracking-widest border-b border-maroon-200 hover:border-maroon-600 transition-all font-sans">Size Chart</button>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {bangleSizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`relative h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-300 font-sans ${selectedSize === size
                                                    ? 'bg-maroon-700 text-white shadow-xl scale-105 z-10'
                                                    : 'bg-white border border-stone-100 text-stone-600 hover:border-maroon-200'
                                                    }`}
                                            >
                                                <span className="text-sm font-black leading-none">{size}</span>
                                                <span className={`text-[8px] mt-1 uppercase tracking-tighter ${selectedSize === size ? 'text-maroon-200' : 'text-stone-400'}`}>Size</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-stone-400 bg-stone-50 px-3 py-2 rounded-lg leading-relaxed italic">
                                        * Not sure? Measure your old bangle's inner diameter for a perfect fit.
                                    </p>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="space-y-4">
                                <span className="font-bold text-gray-900 uppercase tracking-widest text-xs block">Quantity</span>
                                <div className="flex items-center h-14 w-40 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-1/3 h-full flex items-center justify-center hover:bg-stone-50 text-gray-500 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-1/3 text-center font-bold text-gray-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-1/3 h-full flex items-center justify-center hover:bg-stone-50 text-gray-500 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <button
                                onClick={() => addToCart({ ...product, quantity, selectedSize, selectedPack })}
                                className="col-span-1 bg-maroon-700 text-white py-5 px-6 rounded-2xl font-bold shadow-2xl hover:bg-maroon-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                            >
                                <ShoppingBag size={22} className="group-hover:animate-bounce" />
                                Add to Bag
                            </button>
                            <button className="col-span-1 bg-white border-2 border-maroon-700 text-maroon-700 py-5 px-6 rounded-2xl font-bold hover:bg-maroon-50 active:scale-[0.98] transition-all">
                                Buy it Now
                            </button>
                        </div>

                        {/* Trust Features */}
                        <div className="grid grid-cols-2 gap-4 mb-10 bg-cream-50 p-6 rounded-2xl border border-cream-200">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Truck className="text-maroon-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Free Shipping</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Above ₹5000 Orders</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <ShieldCheck className="text-maroon-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Quality Certified</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Authentic Silk Mark</p>
                                </div>
                            </div>
                        </div>

                        {/* Info Accordions - Hidden for Bangles per user request */}
                        {product.category !== 'Bangles' && (
                            <div className="space-y-4 mt-12 bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
                                {['Product Details', 'Shipping & Returns', 'Care Instructions'].map((tab) => (
                                    <div key={tab} className="border-b last:border-0 border-stone-100 pb-4">
                                        <button
                                            onClick={() => setActiveTab(activeTab === tab ? '' : tab)}
                                            className="w-full py-2 flex justify-between items-center text-left transition-colors group"
                                        >
                                            <span className={`font-serif text-lg ${activeTab === tab ? 'text-maroon-700 font-bold' : 'text-gray-800 group-hover:text-maroon-600'}`}>{tab}</span>
                                            <div className={`p-1 rounded-full transition-all ${activeTab === tab ? 'bg-maroon-50 text-maroon-700 rotate-90' : 'text-gray-400'}`}>
                                                <ChevronRight size={18} />
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {activeTab === tab && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="py-4 text-gray-600 leading-relaxed text-sm">
                                                        {tab === 'Product Details' && (
                                                            <ul className="grid grid-cols-2 gap-y-3">
                                                                <li className="flex flex-col">
                                                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Material</span>
                                                                    <span className="font-medium text-gray-900">Pure Silk & Thread</span>
                                                                </li>
                                                                <li className="flex flex-col">
                                                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Work</span>
                                                                    <span className="font-medium text-gray-900">Zari & Stones</span>
                                                                </li>
                                                                <li className="flex flex-col">
                                                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Craft</span>
                                                                    <span className="font-medium text-gray-900">Hand-woven</span>
                                                                </li>
                                                                <li className="flex flex-col">
                                                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Origin</span>
                                                                    <span className="font-medium text-gray-900">Kanchipuram</span>
                                                                </li>
                                                            </ul>
                                                        )}
                                                        {tab === 'Shipping & Returns' && (
                                                            <p>
                                                                Enjoy complimentary express shipping across India on orders above ₹5000.
                                                                Standard shipping takes 5-7 business days.
                                                                We offer a seamless 7-day return policy for unused items in their original packaging.
                                                            </p>
                                                        )}
                                                        {tab === 'Care Instructions' && (
                                                            <ul className="list-disc list-inside space-y-2">
                                                                <li>Avoid direct contact with perfumes and water.</li>
                                                                <li>Store in the provided luxury box or a soft muslin cloth.</li>
                                                                <li>Clean gently with a dry cotton cloth after use.</li>
                                                                <li>Keep away from extreme heat or sunlight.</li>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Secure Shopping Badges */}
                <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-stone-200">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-maroon-700">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="font-serif text-lg font-bold">Secure Payment</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">100% Secure payment gateways with SSL encryption.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-maroon-700">
                            <Truck size={32} />
                        </div>
                        <h3 className="font-serif text-lg font-bold">Express Shipping</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">Fast & reliable delivery to your doorstep within 5-7 days.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-maroon-700">
                            <RefreshCw size={32} />
                        </div>
                        <h3 className="font-serif text-lg font-bold">Easy Returns</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">No questions asked 7-day return policy for unused items.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-maroon-700">
                            <Star size={32} />
                        </div>
                        <h3 className="font-serif text-lg font-bold">Authentic Quality</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">Directly sourced from artisans with Silk Mark certification.</p>
                    </div>
                </div>

                {/* Recommendations Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-24 border-t border-stone-100">
                        <div className="flex flex-col items-center mb-16">
                            <span className="text-maroon-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block text-center">Curated Pairings</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 text-center">Complete Your Collection</h2>
                            <div className="h-1 w-20 bg-maroon-600 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id || p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Fixed CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-stone-200 p-5 z-50 flex items-center gap-5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex-1">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Price</p>
                    <p className="text-2xl font-black text-maroon-800">₹{(selectedPack ? selectedPack.price : product.price).toLocaleString()}</p>
                </div>
                <button
                    onClick={() => addToCart({ ...product, quantity, selectedSize, selectedPack })}
                    className="flex-[2] bg-maroon-700 text-white px-8 py-5 rounded-2xl font-black shadow-2xl shadow-maroon-200 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                    <ShoppingBag size={20} />
                    Add to Bag
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
