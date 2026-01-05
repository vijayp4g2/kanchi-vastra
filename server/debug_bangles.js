
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const bangles = await Product.find({ category: 'Bangles' });
        console.log(`Checking ${bangles.length} bangles:`);
        bangles.forEach(b => {
            console.log(`- ${b.name}: [${b.images.join(', ')}]`);
        });
        process.exit();
    } catch (e) { console.error(e); process.exit(1); }
};
debug();
