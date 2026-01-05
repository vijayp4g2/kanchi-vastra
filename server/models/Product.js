import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxLength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        default: 'Elegant saree from Kanchi Vastra'
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    subCategory: {
        type: String
    },
    images: {
        type: [{
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    inStock: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    isNewArrival: {
        type: Boolean,
        default: true
    },
    isHandmade: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;

