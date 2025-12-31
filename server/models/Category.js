import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true,
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    description: {
        type: String,
        maxLength: [500, 'Description cannot be more than 500 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for product count (we'll implementing population later if needed, 
// or just do a separate query in the controller)
categorySchema.virtual('products', {
    ref: 'Product',
    localField: 'name',
    foreignField: 'category',
    count: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
