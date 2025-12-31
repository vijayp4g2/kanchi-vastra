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
    const [selectedSize, setSelectedSize] = useState('Free Size');
    const [activeTab, setActiveTab] = useState('description');
    const [mainImage, setMainImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // First try to find in context
                let foundProduct = products.find(p => p._id === id || p.id === id); // Handle legacy ID if needed

                if (!foundProduct) {
                    // Fallback to API fetch
                    foundProduct = await api.getProductById(id);
                }

                setProduct(foundProduct);

                // Find related products
                if (foundProduct && products.length > 0) {
                    const related = products
                        .filter(p => p.category === foundProduct.category && p._id !== foundProduct._id)
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
    }, [id, products]);


    if (loading) {
        return (
            <div className="min-h-screen pt-32 text-center flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
                <Link to="/shop" className="text-gold-600 underline">Return to Shop</Link>
            </div>
        );
    }

    // Initialize main image if not set (to handle switching products)
    if (mainImage === null && product) {
        setMainImage(product.images && product.images.length > 0 ? product.images[0] : product.image); // Handle new vs old schema
    }

    // Mock Content - handle single image vs array
    const images = product.images && product.images.length > 0 ? product.images : [product.image, product.image, product.image, product.image];


    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-16">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-gold-600">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/shop" className="hover:text-gold-600">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">{product.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                    {/* Left Column: Images */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-lg relative group"
                        >
                            <img
                                src={mainImage || (product.images && product.images[0]) || product.image || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                                }}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full transition-colors shadow-sm ${isInWishlist(product.id)
                                    ? 'text-red-500' // could add bg-red-50 if desired
                                    : 'text-gray-600 hover:text-red-500'
                                    }`}
                            >
                                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                            </button>
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${(mainImage || product.image) === img && idx === 0 ? 'border-gold-500 ring-2 ring-gold-200' : 'border-transparent hover:border-gold-300'
                                        }`}
                                >
                                    <img
                                        src={img || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                                        alt=""
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                                        }}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col h-full"
                    >
                        <div className="mb-2">
                            <span className="text-gold-600 font-bold tracking-widest text-xs uppercase bg-gold-50 px-3 py-1 rounded-full">
                                {product.category} Collection
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                            <div className="flex items-center gap-1 text-amber-400 text-sm">
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" className="text-gray-300" size={16} />
                                <span className="text-gray-500 ml-1">(4.8)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            Handwoven with precision, this exquisite piece features intricate zari work and
                            premium silk fabric. Perfect for weddings, festivals, and special occasions,
                            it brings a touch of royalty to your wardrobe.
                        </p>

                        {/* Selectors */}
                        <div className="space-y-6 mb-8 border-t border-b border-stone-200 py-6">
                            {/* Offers */}
                            <div className="bg-stone-50 p-4 rounded-xl space-y-2">
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <Truck className="text-gold-600" size={18} />
                                    <span>Free Shipping on orders above ₹5000</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <ShieldCheck className="text-gold-600" size={18} />
                                    <span>Certified Silk Mark Quality</span>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-4">
                                <span className="font-medium text-gray-900 w-24">Quantity</span>
                                <div className="flex items-center border border-stone-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-stone-50 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-stone-50 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-10">
                            <button
                                onClick={() => addToCart({ ...product, quantity })}
                                className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-medium shadow-xl hover:bg-gold-600 hover:shadow-gold-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                <div className="relative">
                                    <ShoppingBag size={20} />
                                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                </div>
                                Add to Cart
                            </button>
                            <button className="flex-1 border-2 border-gray-900 text-gray-900 py-4 px-6 rounded-xl font-medium hover:bg-gray-900 hover:text-white transition-all">
                                Buy Now
                            </button>
                            <button className="p-4 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors text-gray-500">
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Accordion Info */}
                        <div className="divide-y divide-stone-200">
                            {['Product Details', 'Shipping & Returns', 'Care Instructions'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(activeTab === tab ? '' : tab)}
                                    className="w-full py-4 flex justify-between items-center text-left hover:text-gold-600 transition-colors"
                                >
                                    <span className="font-serif text-lg font-medium">{tab}</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeTab === tab ? 'rotate-90' : ''}`}
                                    />
                                </button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {activeTab && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="text-gray-600 overflow-hidden"
                                >
                                    <div className="pb-4 pt-2">
                                        {activeTab === 'Product Details' && (
                                            <ul className="list-disc list-inside space-y-1 text-sm">
                                                <li>Material: Pure Silk</li>
                                                <li>Pattern: Zari Woven</li>
                                                <li>Blouse Piece: Included</li>
                                                <li>Occasion: Wedding & Festive</li>
                                            </ul>
                                        )}
                                        {activeTab === 'Shipping & Returns' && (
                                            <p className="text-sm">
                                                Free shipping across India. International shipping available.
                                                Easy 7-day returns for defective items.
                                            </p>
                                        )}
                                        {activeTab === 'Care Instructions' && (
                                            <p className="text-sm">
                                                Dry Clean Only. Avoid direct sunlight. Store in a muslin cloth.
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Related Products */}
                <div className="mt-24 mb-12">
                    <h2 className="text-3xl font-serif text-gray-900 mb-8 border-l-4 border-gold-500 pl-4">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                    <p className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                </div>
                <button
                    onClick={() => addToCart({ ...product, quantity })}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-transform flex items-center gap-2"
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
