import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Layers,
    CheckCircle2,
    XCircle,
    Save,
    X,
    FolderOpen,
    Loader,
    RefreshCw
} from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const CategoryList = () => {
    const { user } = useAuth();
    const { addToast } = useToast();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Editing / Creating State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: true
    });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await api.getCategories();
            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.error(error);
            addToast('Failed to load categories', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && editId) {
                await api.updateCategory(editId, formData, user.token);
                addToast('Category updated successfully', 'success');
            } else {
                await api.createCategory(formData, user.token);
                addToast('Category created successfully', 'success');
            }
            resetForm();
            fetchCategories();
        } catch (error) {
            addToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.deleteCategory(id, user.token);
                addToast('Category deleted successfully', 'success');
                setCategories(prev => prev.filter(c => c._id !== id && c.id !== id));
            } catch (error) {
                addToast('Failed to delete category', 'error');
            }
        }
    };

    const startEdit = (category) => {
        setFormData({
            name: category.name,
            description: category.description || '',
            isActive: category.isActive !== undefined ? category.isActive : true
        });
        setEditId(category._id || category.id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', isActive: true });
        setIsEditing(false);
        setEditId(null);
    };

    const handleSyncCategories = async () => {
        if (!window.confirm('This will scan all products and create missing categories. Continue?')) return;

        try {
            setLoading(true);
            const productData = await api.getProducts({ pageSize: 1000 }); // Try to get all products
            const products = productData.products || [];

            if (products.length === 0) {
                addToast('No products found to sync from', 'info');
                setLoading(false);
                return;
            }

            // Extract unique categories from products
            // We use a Set to ensure uniqueness
            // We normalize to Title Case or just take the string as is? 
            // Better to take as is but handle case-insensitivity check against existing
            const productCategories = new Set(
                products
                    .filter(p => p.category)
                    .map(p => p.category.trim())
            );

            const existingNames = new Set(categories.map(c => c.name.toLowerCase()));
            let addedCount = 0;

            for (const catName of productCategories) {
                // If this category (case-insensitive) doesn't exist in our Categories list
                if (!existingNames.has(catName.toLowerCase())) {
                    try {
                        await api.createCategory({
                            name: catName,
                            description: 'Auto-detected from products',
                            isActive: true
                        }, user.token);
                        addedCount++;
                    } catch (err) {
                        console.error(`Failed to create category ${catName}`, err);
                    }
                }
            }

            if (addedCount > 0) {
                addToast(`Successfully synced ${addedCount} new categories`, 'success');
                fetchCategories(); // Refresh list
            } else {
                addToast('All product categories already exist', 'info');
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
            addToast('Failed to sync categories', 'error');
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start animate-fadeIn">

            {/* Left Column: List */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-zinc-900">Categories</h2>
                        <p className="text-xs lg:text-sm text-zinc-500">Manage your product classifications</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSyncCategories}
                            className="p-2.5 text-zinc-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-zinc-900 transition-colors"
                            title="Sync from Products"
                        >
                            <RefreshCw size={18} className={loading && categories.length > 0 ? "animate-spin" : ""} />
                        </button>
                        <div className="relative w-full sm:w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center text-zinc-400 animate-pulse">
                        <div className="w-10 h-10 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4"></div>
                        <p className="text-sm font-medium">Loading categories...</p>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 lg:p-12 text-center">
                        <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-zinc-900 font-bold mb-1">No categories found</h3>
                        <p className="text-zinc-500 text-sm mb-4">Create a new category to get started.</p>
                        <button
                            onClick={handleSyncCategories}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
                        >
                            <RefreshCw size={16} />
                            Sync from Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        {filteredCategories.map(item => (
                            <div key={item._id || item.id} className="group bg-white p-4 lg:p-5 rounded-xl border border-gray-200 hover:border-amber-500/30 hover:shadow-lg hover:shadow-zinc-100 transition-all flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2 lg:gap-3">
                                            <div className="p-2 lg:p-2.5 bg-zinc-50 rounded-lg text-zinc-500 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                                                <Layers size={18} className="lg:w-5 lg:h-5" />
                                            </div>
                                            <h3 className="font-bold text-zinc-900 text-base lg:text-lg">{item.name}</h3>
                                        </div>
                                        <span className={`px-2 lg:px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${item.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                                            {item.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-xs lg:text-sm text-zinc-500 line-clamp-2 min-h-[2.5rem] mb-2 leading-relaxed">
                                        {item.description || 'No description provided.'}
                                    </p>
                                    <div className="text-[10px] lg:text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                                        ID: {(item._id || item.id).substring(0, 8)}...
                                    </div>
                                </div>

                                <div className="pt-3 lg:pt-4 border-t border-gray-50 flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => startEdit(item)}
                                        className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} className="lg:w-[18px] lg:h-[18px]" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id || item.id)}
                                        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} className="lg:w-[18px] lg:h-[18px]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-xl shadow-zinc-200/50 border border-gray-200 overflow-hidden lg:sticky lg:top-6">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-zinc-900 flex items-center gap-2">
                            {isEditing ? <Edit2 size={16} /> : <Plus size={16} />}
                            {isEditing ? 'Edit Category' : 'Add Category'}
                        </h3>
                        {isEditing && (
                            <button onClick={resetForm} className="text-xs font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors">
                                Cancel
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSave} className="p-6 space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-zinc-500 uppercase">Category Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Wedding Silk"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 outline-none transition-all font-medium text-sm text-zinc-900"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-zinc-500 uppercase">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of this collection..."
                                rows="4"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 outline-none transition-all font-medium text-sm text-zinc-900 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-zinc-500 uppercase">Visibility</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, isActive: true }))}
                                    className={`py-2 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${formData.isActive ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                                >
                                    <CheckCircle2 size={14} /> Active
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, isActive: false }))}
                                    className={`py-2 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${!formData.isActive ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                                >
                                    <XCircle size={14} /> Inactive
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-zinc-900 text-white rounded-lg font-bold text-sm shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transform active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isEditing ? <Save size={18} /> : <Plus size={18} />}
                            {isEditing ? 'Update Category' : 'Create Category'}
                        </button>
                    </form>
                </div>

                {/* Tip Box */}
                <div className="mt-6 bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 items-start">
                    <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                        <FolderOpen size={16} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Pro Tip</h4>
                        <p className="text-xs text-amber-800 leading-relaxed">
                            Organizing products into clear categories helps customers find what they speed. Inactive categories are hidden from the store but safe in the database.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CategoryList;
