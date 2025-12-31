import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    LayoutGrid,
    CheckCircle2,
    XCircle,
    GripVertical,
    Save,
    X,
    Loader
} from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const CategoryList = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isAdding, setIsAdding] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await api.getCategories();
            setCategories(data);
        } catch (error) {
            addToast('Failed to load categories', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleStatus = async (category) => {
        try {
            const updated = await api.updateCategory(category.id, {
                isActive: !category.isActive
            }, user.token);

            setCategories(categories.map(cat =>
                cat.id === category.id ? { ...cat, isActive: updated.isActive } : cat
            ));
            addToast(`Category ${updated.isActive ? 'enabled' : 'disabled'}`, 'success');
        } catch (error) {
            addToast('Failed to update status', 'error');
        }
    };

    const handleAdd = async () => {
        if (!newCategoryName.trim()) return;

        try {
            const newCat = await api.createCategory({
                name: newCategoryName
            }, user.token);

            setCategories([newCat, ...categories]);
            setNewCategoryName('');
            setIsAdding(false);
            addToast('Category added successfully', 'success');
        } catch (error) {
            addToast(error.message || 'Failed to add category', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await api.deleteCategory(id, user.token);
            setCategories(categories.filter(cat => cat.id !== id));
            addToast('Category deleted successfully', 'success');
        } catch (error) {
            addToast(error.message || 'Failed to delete category', 'error');
        }
    };

    const startEdit = (category) => {
        setEditingId(category.id);
        setEditName(category.name);
    };

    const saveEdit = async () => {
        if (!editName.trim()) return;

        try {
            const updated = await api.updateCategory(editingId, {
                name: editName
            }, user.token);

            setCategories(categories.map(cat =>
                cat.id === editingId ? { ...cat, name: updated.name } : cat
            ));
            setEditingId(null);
            setEditName('');
            addToast('Category updated successfully', 'success');
        } catch (error) {
            addToast(error.message || 'Failed to update category', 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-maroon-900" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-serif font-bold text-maroon-900">Collection Management</h3>
                    <p className="text-sm text-gray-400 font-medium">Define and organize your store's saree categories</p>
                </div>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-maroon-900 text-gold-200 rounded-xl font-bold text-sm hover:bg-maroon-800 transition-all shadow-lg shadow-maroon-900/10"
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                )}
            </div>

            {/* In-Line Add Form */}
            {isAdding && (
                <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-maroon-100 flex items-center gap-4 animate-slideDown">
                    <div className="flex-1 relative">
                        <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon-300" size={18} />
                        <input
                            type="text"
                            placeholder="Enter category name (e.g., Banarasi, Pattu...)"
                            className="w-full pl-10 pr-4 py-3 bg-cream-50/50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-maroon-900/10 focus:border-maroon-900/20 outline-none transition-all font-medium"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleAdd}
                            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-md shadow-green-600/10"
                            title="Save Category"
                        >
                            <Save size={20} />
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all"
                            title="Cancel"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Category Cards / List */}
            <div className="grid gap-4">
                {categories.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <p>No categories found. Add one to get started!</p>
                    </div>
                ) : (
                    categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={`bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-maroon-100 hover:shadow-md transition-all duration-300 ${!cat.isActive ? 'opacity-70 grayscale-[0.5]' : ''}`}
                        >
                            {editingId === cat.id ? (
                                // Edit Mode
                                <div className="flex-1 flex items-center gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full px-4 py-2 bg-cream-50/50 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/10"
                                            autoFocus
                                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                        />
                                    </div>
                                    <button onClick={saveEdit} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                        <Save size={18} />
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                // View Mode
                                <>
                                    <div className="flex items-center gap-5">
                                        <div className="text-gray-300 cursor-grab active:cursor-grabbing hover:text-maroon-400 transition-colors">
                                            <GripVertical size={20} />
                                        </div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.isActive ? 'bg-maroon-50 text-maroon-700' : 'bg-gray-100 text-gray-400'}`}>
                                            <LayoutGrid size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                                {cat.name}
                                                {!cat.isActive && (
                                                    <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Disabled</span>
                                                )}
                                            </h4>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{cat.productCount || 0} Products</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Toggle Status */}
                                        <button
                                            onClick={() => toggleStatus(cat)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all border ${cat.isActive
                                                ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
                                                : 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100'
                                                }`}
                                        >
                                            {cat.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                            {cat.isActive ? 'Enabled' : 'Disabled'}
                                        </button>

                                        <div className="w-[1px] h-6 bg-gray-100"></div>

                                        {/* Actions */}
                                        <button
                                            onClick={() => startEdit(cat)}
                                            className="p-2 text-gray-400 hover:text-maroon-900 hover:bg-maroon-50 rounded-lg transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Help / Tip Alert */}
            <div className="bg-gold-50/50 border border-gold-100 p-4 rounded-xl flex gap-3 items-start">
                <div className="p-1.5 bg-gold-400 rounded-lg text-white">
                    <CheckCircle2 size={16} />
                </div>
                <p className="text-xs text-gold-900 font-medium leading-relaxed">
                    <span className="font-bold">Pro Tip:</span> Disabled categories will be hidden from the website's navigation and filters, but the products within them will remain in the database.
                </p>
            </div>
        </div>
    );
};

export default CategoryList;
