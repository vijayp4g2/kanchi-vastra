
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI not defined');
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const count = await Product.countDocuments();
        console.log(`Product Count: ${count}`);

        if (count > 0) {
            const products = await Product.find().limit(1);
            console.log('Sample Product:', JSON.stringify(products[0], null, 2));
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
