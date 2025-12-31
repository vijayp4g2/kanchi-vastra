import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import { useProduct } from '../../context/ProductContext';

const TrendingFashion = () => {
    const { products, loading } = useProduct();
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        if (products) {
            // Filter for featured products or some other criteria
            // Since we don't have a 'trending' flag, we can use 'featured' or just pick first 2
            const featured = products.filter(p => p.featured).slice(0, 2);
            setTrending(featured.length > 0 ? featured : products.slice(0, 2));
        }
    }, [products]);

    if (loading || trending.length === 0) return null; // Or skeleton

    return (
        <Section className="bg-cream-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">Trending Fashion</h2>
                <p className="text-gray-500">Discover the styles that are defining this season's elegance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {trending.map((item) => (
                    <div key={item._id || item.id} className="relative group overflow-hidden rounded-2xl h-[500px]">
                        <img
                            src={item.images && item.images.length > 0 ? item.images[0] : item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                            <h3 className="text-3xl font-serif font-medium mb-2">{item.name}</h3>
                            <Link to={`/product/${item._id || item.id}`}>
                                <button className="w-fit text-sm uppercase tracking-widest border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    Shop Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};


export default TrendingFashion;
