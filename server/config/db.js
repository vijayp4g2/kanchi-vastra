import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        // Log connection attempt (masking password for safety)
        const maskedUri = uri.replace(/:([^:@]{1,})@/, ':****@');
        console.log(`Attempting to connect to: ${maskedUri}`);

        const conn = await mongoose.connect(uri.trim(), {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
