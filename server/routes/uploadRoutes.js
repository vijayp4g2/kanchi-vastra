import express from 'express';
import multer from 'multer';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Use memory storage instead of disk storage for Cloudinary
const storage = multer.memoryStorage();

// File filter to accept only images
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only! (jpg, jpeg, png, webp)'));
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit per file
    }
});

// Single image upload
router.post('/', protect, admin, upload.single('image'), uploadImage);

// Multiple images upload
router.post('/multiple', protect, admin, upload.array('images', 5), uploadMultipleImages);

// Delete image
router.delete('/:public_id', protect, admin, deleteImage);

export default router;
