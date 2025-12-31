import React from 'react';
import Hero from '../components/home/Hero';
import ShopByCategory from '../components/home/ShopByCategory';
import CollectionsShowcase from '../components/home/CollectionsShowcase';
import BrandStory from '../components/home/BrandStory';

import Newsletter from '../components/home/Newsletter';

const Home = () => {
    return (
        <div className="bg-cream-50 overflow-x-hidden w-full">
            {/* Hero Section - Immersive first impression */}
            <Hero />

            {/* Brand Story - Establishing the narrative early */}
            <BrandStory />

            {/* Shop by Category - Clear navigation entry points */}
            <ShopByCategory />

            {/* Collections Showcase - The main visual attraction for products */}
            <CollectionsShowcase />



            {/* Newsletter - Community building */}
            <Newsletter />
        </div>
    );
};

export default Home;

