import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();



const users = [
    {
        name: 'Admin User',
        email: 'admin@kanchivastra.com',
        password: 'password123',
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    },
];

const productsData = [
    {
        name: "Royal Kanchipuram Silk",
        price: 15999,
        category: "Wedding",
        images: ["https://images.unsplash.com/photo-1679006831648-7c9ea12e5807?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Banarasi Georgette",
        price: 8499,
        category: "Festival",
        images: ["https://images.unsplash.com/photo-1727430228383-aa1fb59db8bf?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Soft Mysore Silk",
        price: 4999,
        category: "Casual",
        images: ["https://images.unsplash.com/photo-1610030469668-8e9f641aaf27?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Chanderi Cotton",
        price: 3200,
        category: "Casual",
        images: ["https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Grand Wedding Silk",
        price: 24999,
        category: "Wedding",
        images: ["https://images.unsplash.com/photo-1610189013429-a703f4b245cf?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Elegant Linen Saree",
        price: 5500,
        category: "Modern",
        images: ["https://images.unsplash.com/photo-1610189338175-0782dfdb0c04?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Golden Zari Kanchipuram",
        price: 18500,
        category: "Kanchipuram",
        images: ["https://images.unsplash.com/photo-1588140686379-1b76a52103dc?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Festive Silk Blend",
        price: 6799,
        category: "Festival",
        images: ["https://images.unsplash.com/photo-1609748341932-f0206c09412b?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Modern Floral Georgette",
        price: 4200,
        category: "Modern",
        images: ["https://images.unsplash.com/photo-1610189026297-df356264479c?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Traditional Temple Border",
        price: 12999,
        category: "Kanchipuram",
        images: ["https://images.unsplash.com/photo-1615555896813-401d84a0d737?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Lightweight Daily Cotton",
        price: 2800,
        category: "Casual",
        images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Premium Bridal Gold",
        price: 35000,
        category: "Wedding",
        images: ["https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Silver Zari Soft Silk",
        price: 9500,
        category: "Festival",
        images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
    },
    {
        name: "Contemporary Print Silk",
        price: 5900,
        category: "Modern",
        images: ["https://images.unsplash.com/photo-1610189025857-f42fe6e8dd91?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Handloom Cotton",
        price: 3500,
        category: "Casual",
        images: ["https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
    },
    {
        name: "Temple Silk Bangle Set",
        price: 1200,
        category: "Bangles",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
        featured: false
    },
    {
        name: "Antique Gold Polki Bangles",
        price: 2500,
        category: "Bangles",
        images: ["https://images.unsplash.com/photo-1629227314540-362088fd11cf?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
        featured: false
    },
    {
        name: "Handcrafted Thread Bangles",
        price: 850,
        category: "Bangles",
        subCategory: "Handmade",
        images: ["https://images.unsplash.com/photo-1598560912005-09a4736f1831?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
        isHandmade: true,
        featured: false
    },
    {
        name: "Royal Silk Thread Bangle Set",
        price: 1550,
        category: "Bangles",
        subCategory: "Handmade",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
        isHandmade: true,
        featured: false
    },
    {
        name: "Kundan Studded Handcrafted Bangles",
        price: 3200,
        category: "Bangles",
        subCategory: "Handmade",
        images: ["https://images.unsplash.com/photo-1629227314540-362088fd11cf?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
        isHandmade: true,
        featured: false
    },
    {
        name: "Traditional Mirror Work Bangles",
        price: 1100,
        category: "Bangles",
        subCategory: "Handmade",
        images: ["https://images.unsplash.com/photo-1598560912005-09a4736f1831?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
        isHandmade: true,
        featured: false
    },
    {
        name: "Zardosi Embroidery Bangles",
        price: 1800,
        category: "Bangles",
        subCategory: "Handmade",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: false,
        isHandmade: true,
        featured: false
    },
    {
        name: "Pearl & Gold Handcrafted Bangles",
        price: 2800,
        category: "Bangles",
        subCategory: "Handmade",
        images: ["https://images.unsplash.com/photo-1629227314540-362088fd11cf?q=80&w=1200&auto=format&fit=crop"],
        isNewArrival: true,
        isHandmade: true,
        featured: false
    },
    // Popular Blouses
    {
        name: "Embroidery Work Blouse",
        price: 1200,
        category: "Blouse",
        images: ["https://images.unsplash.com/photo-1631215579308-542bea9278bd?q=80&w=2670&auto=format&fit=crop"],
        isNewArrival: true,
        featured: true
    },
    {
        name: "Golden Zari Blouse",
        price: 1800,
        category: "Blouse",
        images: ["https://images.unsplash.com/photo-1591526438692-bb5345d17ab8?q=80&w=2670&auto=format&fit=crop"],
        isNewArrival: false,
        featured: true
    },
    {
        name: "Designer Velvet",
        price: 2500,
        category: "Blouse",
        images: ["https://images.unsplash.com/photo-1631215579541-61cfc4b7858c?q=80&w=2670&auto=format&fit=crop"],
        isNewArrival: true,
        featured: true
    },
    // Featured / Trending Fashion Items
    {
        name: "Modern Drapes",
        price: 8500,
        category: "Modern",
        images: ["https://images.unsplash.com/photo-1583391733975-d22797e88c03?q=80&w=2574&auto=format&fit=crop"],
        isNewArrival: true,
        featured: true
    },
    {
        name: "Classic Weaves",
        price: 10500,
        category: "Casual",
        images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop"],
        isNewArrival: true,
        featured: true
    }
];


const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        await User.insertMany(users);
        await Product.insertMany(productsData);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const runSeeder = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
};

runSeeder();

