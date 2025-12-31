import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const category = req.query.category ? { category: req.query.category } : {};

    // Sort logic
    let sort = {};
    if (req.query.sort) {
        const sortParam = req.query.sort;
        if (sortParam === 'newest') sort = { createdAt: -1 };
        else if (sortParam === 'oldest') sort = { createdAt: 1 };
        else if (sortParam === 'price_asc') sort = { price: 1 };
        else if (sortParam === 'price_desc') sort = { price: -1 };
        else if (sortParam === 'name_asc') sort = { name: 1 };
        else if (sortParam === 'name_desc') sort = { name: -1 };
    } else {
        sort = { createdAt: -1 }; // Default to newest
    }

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
        .sort(sort)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count
    });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, images, category, subCategory, inStock, featured, isNew, isHandmade } = req.body;

    // Use request body if provided, otherwise defaults will be handled by schema or logic here.
    // Removed specific "Sample" fallbacks to encourage real data, but kept structure safe.

    const product = new Product({
        name: name || 'Sample Name',
        price: price || 0,
        user: req.user._id,
        images: images || [],
        category: category || 'Uncategorized',
        subCategory,
        inStock: inStock !== undefined ? inStock : true,
        featured: featured || false,
        isNew: isNew !== undefined ? isNew : true,
        isHandmade: isHandmade || false,
        description: description || 'No description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, images, category, subCategory, inStock, featured, isNew, isHandmade } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.images = images || product.images;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.inStock = inStock !== undefined ? inStock : product.inStock;
        product.featured = featured !== undefined ? featured : product.featured;
        product.isNew = isNew !== undefined ? isNew : product.isNew;
        product.isHandmade = isHandmade !== undefined ? isHandmade : product.isHandmade;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
