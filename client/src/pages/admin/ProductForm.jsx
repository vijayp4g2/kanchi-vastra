import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    Upload,
    ImageIcon,
    IndianRupee,
    Layers,
    Type,
    Save,
    Trash2,
    Check
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

    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || defaultCategory || '',
                price: initialData.price || '',
                description: initialData.description || '',
                inStock: initialData.inStock !== undefined ? initialData.inStock : true,
                isNewArrival: initialData.isNewArrival !== undefined ? initialData.isNewArrival : (initialData.isNew || false),
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
            // Upload new images
            const finalImageUrls = [];
            images.filter(img => img.isExisting).forEach(img => finalImageUrls.push(img.preview));

            const newImageFiles = images.filter(img => !img.isExisting);
            for (const imgObj of newImageFiles) {
                const uploadData = new FormData();
                uploadData.append('image', imgObj.file);
                const url = await api.uploadImage(uploadData, user.token);
                finalImageUrls.push(url);
            }

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

            if (initialData) {
                await api.updateProduct(initialData.id || initialData._id, payload, user.token);
                addToast('Product updated successfully', 'success');
            } else {
                await api.createProduct(payload, user.token);
                addToast('Product created successfully', 'success');
            }

            onClose();
        } catch (error) {
            console.error("Form Error:", error);
            addToast(error.message || 'Failed to save product', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isBangles = formData.category === 'Bangles' || defaultCategory === 'Bangles';
    const categories = isBangles
        ? ['Bangles']
        : ['Wedding', 'Kanchipuram', 'Festival', 'Casual', 'Modern'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <h2 className="text-xl font-bold text-zinc-900">
                        {initialData ? 'Edit Item' : 'New Item'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-zinc-900 hover:bg-gray-100 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    <form id="product-form" onSubmit={handleSubmit} className="space-y-8">

                        {/* Images Section */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-zinc-700">Product Images</label>
                            <div className="grid grid-cols-5 gap-3">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={img.preview} alt="Upload preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        {idx === 0 && <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">Cover</div>}
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-amber-600 hover:border-amber-500 hover:bg-amber-50 transition-all bg-gray-50"
                                    >
                                        <Upload size={20} />
                                        <span className="text-[10px] font-bold uppercase">Add</span>
                                    </button>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" multiple accept="image/*" />
                        </div>

                        {/* Basic Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase">
                                    <Type size={14} /> Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 placeholder:text-gray-300"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase">
                                    <Layers size={14} /> Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 appearance-none bg-white"
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2 col-span-full">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Describe the product..."
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 placeholder:text-gray-300 resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase">
                                    <IndianRupee size={14} /> Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-bold text-zinc-900 placeholder:text-gray-300"
                                    required
                                    min="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Availability</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, inStock: true }))}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${formData.inStock ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-400'}`}
                                    >
                                        In Stock
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, inStock: false }))}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${!formData.inStock ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-gray-200 text-gray-400'}`}
                                    >
                                        Out of Stock
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="flex gap-4 pt-2">
                            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer select-none transition-all ${formData.isFeatured ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-white border-gray-200 text-gray-500'}`}>
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {formData.isFeatured && <Check size={14} />}
                                <span className="text-sm font-bold">Featured Product</span>
                            </label>

                            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer select-none transition-all ${formData.isNewArrival ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-white border-gray-200 text-gray-500'}`}>
                                <input
                                    type="checkbox"
                                    name="isNewArrival"
                                    checked={formData.isNewArrival}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {formData.isNewArrival && <Check size={14} />}
                                <span className="text-sm font-bold">New Arrival</span>
                            </label>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg text-zinc-500 font-bold text-sm hover:bg-gray-200 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-zinc-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-zinc-900/10"
                    >
                        {isSubmitting ? 'Saving...' : (initialData ? 'Update Item' : 'Create Item')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
