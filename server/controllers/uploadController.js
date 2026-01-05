import cloudinary from '../config/cloudinary.js';
import asyncHandler from 'express-async-handler';

// @desc    Upload single image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No image file provided');
    }

    try {
        // Upload to Cloudinary
        // The file buffer is available in req.file.buffer when using memoryStorage
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            {
                folder: 'kanchi-vastra',
                resource_type: 'image',
                transformation: [
                    { width: 1200, height: 1200, crop: 'limit' },
                    { quality: 'auto:good' }
                ]
            }
        );

        res.json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500);
        throw new Error('Image upload failed: ' + error.message);
    }
});

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
// @access  Private/Admin
const uploadMultipleImages = asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('No image files provided');
    }

    try {
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
                {
                    folder: 'kanchi-vastra',
                    resource_type: 'image',
                    transformation: [
                        { width: 1200, height: 1200, crop: 'limit' },
                        { quality: 'auto:good' }
                    ]
                }
            )
        );

        const results = await Promise.all(uploadPromises);

        const images = results.map(result => ({
            url: result.secure_url,
            public_id: result.public_id
        }));

        res.json(images);
    } catch (error) {
        console.error('Cloudinary multiple upload error:', error);
        res.status(500);
        throw new Error('Multiple image upload failed: ' + error.message);
    }
});

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:public_id
// @access  Private/Admin
const deleteImage = asyncHandler(async (req, res) => {
    const { public_id } = req.params;

    if (!public_id) {
        res.status(400);
        throw new Error('Public ID is required');
    }

    try {
        // Decode the public_id (it comes URL encoded)
        const decodedPublicId = decodeURIComponent(public_id);

        const result = await cloudinary.uploader.destroy(decodedPublicId);

        if (result.result === 'ok' || result.result === 'not found') {
            res.json({ message: 'Image deleted successfully', result: result.result });
        } else {
            res.status(400);
            throw new Error('Failed to delete image');
        }
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        res.status(500);
        throw new Error('Image deletion failed: ' + error.message);
    }
});

export { uploadImage, uploadMultipleImages, deleteImage };
