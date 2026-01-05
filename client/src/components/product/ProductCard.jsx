import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
    const { openQuickView } = useQuickView();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    return (
        <div className="group relative">
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-[3/4]">
                    <img
                        src={product.image || 'https://placehold.co/600x800?text=Kanchi+Vastra'}
                        alt={product.name}
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {product.isNewArrival && (
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-widest font-medium text-gray-900 rounded-full z-10">
                            New
                        </span>
                    )}

                    {(product.isHandmade || product.subCategory === 'Handmade') && (
                        <span className={`absolute ${product.isNewArrival ? 'top-12' : 'top-4'} left-4 bg-amber-100/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-amber-800 rounded-full z-10`}>
                            Handmade
                        </span>
                    )}

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                        }}
                        className={`absolute top-4 right-4 p-2 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300 ${inWishlist
                            ? 'bg-red-50 text-red-600'
                            : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-600'
                            }`}
                        title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Heart size={18} fill={inWishlist ? "currentColor" : "none"} strokeWidth={inWishlist ? 0 : 2} />
                    </button>

                    {/* Hover Actions */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex gap-2">
                        <button
                            className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-medium shadow-lg hover:bg-gold-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                            }}
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                        <button
                            className="bg-white text-gray-900 p-3 rounded-xl font-medium shadow-lg hover:bg-gold-500 hover:text-white transition-colors flex items-center justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                                openQuickView(product);
                            }}
                            title="Quick View"
                        >
                            <Eye size={20} />
                        </button>
                    </div>
                </div>

                <div className="mt-2 text-center px-2">
                    <p className="text-[10px] text-maroon-600 uppercase tracking-widest font-bold mb-1 opacity-80">{product.category}</p>
                    <h3 className="font-serif text-lg text-gray-900 truncate group-hover:text-maroon-600 transition-colors duration-300 px-2">{product.name}</h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <p className="font-bold text-maroon-800">₹{product.price.toLocaleString()}</p>
                        {product.oldPrice && (
                            <p className="text-sm text-gray-400 line-through font-light">₹{product.oldPrice.toLocaleString()}</p>
                        )}
                    </div>
                </div>
            </Link >
        </div >
    );
};

export default ProductCard;
