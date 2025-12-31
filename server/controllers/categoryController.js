import Category from '../models/Category.js';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    // Get all categories
    const categories = await Category.find({}).sort({ createdAt: -1 });

    // For each category, get the product count
    const categoriesWithCount = await Promise.all(categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat.name });
        return {
            ...cat.toObject(),
            productCount: count
        };
    }));

    res.json(categoriesWithCount);
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name, description, isActive } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name,
        description,
        isActive
    });

    if (category) {
        res.status(201).json({
            ...category.toObject(),
            productCount: 0
        });
    } else {
        res.status(400);
        throw new Error('Invalid category data');
    }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const { name, description, isActive } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = name || category.name;
        category.description = description !== undefined ? description : category.description;
        category.isActive = isActive !== undefined ? isActive : category.isActive;

        const updatedCategory = await category.save();

        // Get updated count
        const count = await Product.countDocuments({ category: updatedCategory.name });

        res.json({
            ...updatedCategory.toObject(),
            productCount: count
        });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await category.deleteOne();
        res.json({ message: 'Category removed' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

export {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
