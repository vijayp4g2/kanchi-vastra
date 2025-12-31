import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    Upload,
    Plus,
    Minus,
    Check,
    AlertCircle,
    ImageIcon,
    IndianRupee,
    Tag,
    Layers,
    Type,
    Save,
    Trash2
} from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ProductForm = ({ onClose, initialData = null, defaultCategory = '', defaultNewArrival = false }) => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const fileInputRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: defaultCategory || '',
        price: '',
        description: '',
        inStock: true,
        isNewArrival: defaultNewArrival,
        isFeatured: false,
    });

    // Image State: Array of objects { file: File | null, preview: string, isExisting: boolean }
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize Data
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || defaultCategory || '',
                price: initialData.price || '',
                description: initialData.description || '',
                inStock: initialData.inStock !== undefined ? initialData.inStock : true,
                isNewArrival: initialData.isNewArrival !== undefined ? initialData.isNewArrival : (initialData.isNew !== undefined ? initialData.isNew : false),
                isFeatured: initialData.featured || false,
            });

            if (initialData.images && Array.isArray(initialData.images)) {
                setImages(initialData.images.map(url => ({ file: null, preview: url, isExisting: true })));
            } else if (initialData.image) {
                setImages([{ file: null, preview: initialData.image, isExisting: true }]);
            }
        }
    }, [initialData, defaultCategory]);

    // Handlers
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            addToast('Maximum 5 images allowed', 'error');
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            isExisting: false
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(prev => {
            const newImages = [...prev];
            // If it's a blob URL (not existing), revoke it to free memory
            if (!newImages[index].isExisting) {
                URL.revokeObjectURL(newImages[index].preview);
            }
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Upload new images
            const finalImageUrls = [];

            // Existing images (strings)
            images.filter(img => img.isExisting).forEach(img => finalImageUrls.push(img.preview));

            // New images (Files)
            const newImageFiles = images.filter(img => !img.isExisting);

            for (const imgObj of newImageFiles) {
                const uploadData = new FormData();
                uploadData.append('image', imgObj.file);
                // Assumption: api.uploadImage returns the string URL path
                const url = await api.uploadImage(uploadData, user.token);
                finalImageUrls.push(url);
            }

            // 2. Prepare Payload
            const payload = {
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                description: formData.description,
                images: finalImageUrls,
                inStock: formData.inStock,
                featured: formData.isFeatured,
                isNewArrival: formData.isNewArrival
            };

            // 3. API Call
            if (initialData) {
                await api.updateProduct(initialData.id || initialData._id, payload, user.token);
                addToast('Updated successfully', 'success');
            } else {
                await api.createProduct(payload, user.token);
                addToast('Created successfully', 'success');
            }

            onClose(); // Trigger refresh in parent
        } catch (error) {
            console.error("Form Error:", error);
            addToast(error.message || 'Failed to save product', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Constants
    const isBangles = formData.category === 'Bangles' || defaultCategory === 'Bangles';
    const categories = isBangles
        ? ['Bangles']
        : ['Wedding', 'Kanchipuram', 'Festival', 'Casual', 'Modern'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-maroon-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-maroon-900">
                            {initialData ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the details for your {isBangles ? 'bangle' : 'saree'} listing.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-50 text-gray-400 hover:bg-maroon-50 hover:text-maroon-900 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
                    <form id="product-form" onSubmit={handleSubmit} className="space-y-8">

                        {/* Section 1: Basic Info */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 mb-2 text-maroon-900 border-b border-gray-100 pb-2">
                                <Type size={18} />
                                <h3 className="font-bold text-sm uppercase tracking-wider">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Product Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Royal Blue Kanchipuram"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-300 focus:ring-4 focus:ring-maroon-50 bg-gray-50/50 outline-none transition-all font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Category <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-300 focus:ring-4 focus:ring-maroon-50 bg-gray-50/50 outline-none transition-all font-medium appearance-none"
                                            required
                                        >
                                            <option value="" disabled>Select a Category</option>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Description <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Detailed description of the fabric, design, and occasion..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-300 focus:ring-4 focus:ring-maroon-50 bg-gray-50/50 outline-none transition-all font-medium resize-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Pricing & Inventory */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 mb-2 text-maroon-900 border-b border-gray-100 pb-2">
                                <Tag size={18} />
                                <h3 className="font-bold text-sm uppercase tracking-wider">Pricing & Status</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Price (INR) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-300 focus:ring-4 focus:ring-maroon-50 bg-gray-50/50 outline-none transition-all font-bold text-gray-900"
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Stock Status</label>
                                    <div className="flex bg-gray-100 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, inStock: true }))}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.inStock ? 'bg-white text-green-700 shadow-sm' : 'text-gray-400'}`}
                                        >
                                            In Stock
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, inStock: false }))}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!formData.inStock ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'}`}
                                        >
                                            Out of Stock
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.isNewArrival ? 'border-maroon-500 bg-maroon-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                                    <input
                                        type="checkbox"
                                        name="isNewArrival"
                                        checked={formData.isNewArrival}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-maroon-600 rounded focus:ring-maroon-500 border-gray-300"
                                    />
                                    <span className={`text-sm font-bold ${formData.isNewArrival ? 'text-maroon-900' : 'text-gray-600'}`}>Mark as New Arrival</span>
                                </label>

                                <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.isFeatured ? 'border-gold-500 bg-gold-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500 border-gray-300"
                                    />
                                    <span className={`text-sm font-bold ${formData.isFeatured ? 'text-gold-800' : 'text-gray-600'}`}>Mark as Featured</span>
                                </label>
                            </div>
                        </div>

                        {/* Section 3: Images */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center justify-between mb-2 border-b border-gray-100 pb-2">
                                <div className="flex items-center gap-2 text-maroon-900">
                                    <ImageIcon size={18} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Product Gallery</h3>
                                </div>
                                <span className="text-xs font-bold text-gray-400">{images.length}/5 Images</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-[3/4] group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                        <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        {idx === 0 && (
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-bold uppercase">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {images.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-maroon-500 hover:text-maroon-600 hover:bg-maroon-50 transition-all bg-gray-50"
                                    >
                                        <Upload size={24} />
                                        <span className="text-xs font-bold uppercase tracking-wide">Upload</span>
                                    </button>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                multiple
                                accept="image/*"
                            />
                            <p className="text-xs text-gray-400 text-center">
                                Detailed images help customers decide. Upload high-quality JPEG or PNG files.
                            </p>
                        </div>

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-white">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-gray-500 font-bold text-sm hover:bg-gray-100 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-2.5 bg-maroon-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-maroon-900/20 hover:bg-maroon-800 transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                {initialData ? 'Update Product' : 'Publish Product'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
