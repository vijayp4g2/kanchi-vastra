import React, { useState, useEffect } from 'react';
import {
    Plus,
    Filter,
    Edit2,
    Trash2,
    LayoutGrid,
    List,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    CheckCircle2,
    AlertCircle,
    PackageX,
    MoreHorizontal
} from 'lucide-react';
import ProductForm from './ProductForm';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ProductList = ({ initialCategory = '', filterNewArrivals = false }) => {
    const { user } = useAuth();
    const { addToast } = useToast();

    // Core Data States
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');

    // Actions & UI States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState('newest');
    const [categoryFilter, setCategoryFilter] = useState(initialCategory);
    const [stockFilter, setStockFilter] = useState('all');

    // Derived Constants
    const isBangles = initialCategory === 'Bangles';
    const categories = isBangles
        ? ['Bangles']
        : ['Wedding', 'Kanchipuram', 'Festival', 'Casual', 'Modern'];

    useEffect(() => {
        setCategoryFilter(initialCategory);
    }, [initialCategory]);

    // Data Fetching
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                keyword: searchQuery,
                pageNumber: page,
                // CRITICAL FIX: Increased pageSize to show all products in admin
                // Grid and list view now show complete inventory
                pageSize: 1000,  // Changed from 12/10 to 1000 to display all products
                sort: sortBy,
                category: categoryFilter,
                inStock: stockFilter === 'all' ? undefined : stockFilter
            };

            if (isBangles) params.category = 'Bangles';
            if (filterNewArrivals) params.isNewArrival = true;

            const data = await api.getProducts(params);
            let filteredProducts = data.products || [];

            if (!isBangles && !filterNewArrivals && !categoryFilter) {
                filteredProducts = filteredProducts.filter(p => p.category !== 'Bangles');
            }

            setProducts(filteredProducts);
            setPages(data.pages || 1);
            setTotal(data.total || 0);
        } catch (error) {
            console.error(error);
            addToast('Failed to load inventory', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sortBy, categoryFilter, initialCategory, filterNewArrivals, stockFilter]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (page !== 1) setPage(1);
            else fetchProducts();
        }, 600);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    // Handlers
    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            try {
                await api.deleteProduct(id, user.token);
                addToast('Item deleted successfully', 'success');
                setProducts(prev => prev.filter(p => p.id !== id));
                setTotal(prev => prev - 1);
            } catch (error) {
                addToast(error.message || 'Delete failed', 'error');
            }
        }
    };

    const handleEdit = (product, e) => {
        e.stopPropagation();
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
        fetchProducts();
    };

    // Components
    const StatusBadge = ({ inStock }) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${inStock
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-rose-50 text-rose-700 border-rose-100'
            }`}>
            {inStock ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
            {inStock ? 'Stock' : 'Out'}
        </span>
    );

    const ProductCard = ({ product }) => (
        <div
            onClick={(e) => handleEdit(product, e)}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 hover:border-amber-500/30 transition-all duration-300 cursor-pointer flex flex-col h-full relative"
        >
            {/* Image Area */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <StatusBadge inStock={product.inStock} />
                    {product.featured && (
                        <span className="px-2 py-1 bg-amber-400 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm border border-amber-500">
                            Featured
                        </span>
                    )}
                </div>

                {/* Hover Overlay Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between">
                    <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded">
                        ID: {product.id.substring(0, 6)}
                    </span>
                    <button
                        onClick={(e) => handleDelete(product.id, e)}
                        className="p-2 bg-white text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category}</span>
                    <span className="font-serif font-bold text-zinc-900">₹{product.price.toLocaleString()}</span>
                </div>
                <h3 className="font-medium text-sm text-zinc-700 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {product.name}
                </h3>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span>Added {new Date().toLocaleDateString()}</span>
                    <span className="font-medium text-amber-600 group-hover:underline">Edit Details &rarr;</span>
                </div>
            </div>
        </div>
    );

    const ProductListItem = ({ product }) => (
        <div
            onClick={(e) => handleEdit(product, e)}
            className="group flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-amber-500/30 hover:shadow-lg hover:shadow-zinc-100 transition-all cursor-pointer mb-3"
        >
            <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{product.category}</span>
                    {product.featured && <span className="text-[10px] text-amber-500 font-bold">• Featured</span>}
                </div>
                <h3 className="font-medium text-zinc-900 truncate">{product.name}</h3>
                <p className="text-xs text-zinc-400">ID: {product.id}</p>
            </div>

            <div className="text-right px-4">
                <span className="block font-serif font-bold text-zinc-900">₹{product.price.toLocaleString()}</span>
            </div>

            <div className="px-4">
                <StatusBadge inStock={product.inStock} />
            </div>

            <div className="flex items-center gap-2 px-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => handleEdit(product, e)}
                    className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                    <Edit2 size={16} />
                </button>
                <button
                    onClick={(e) => handleDelete(product.id, e)}
                    className="p-2 hover:bg-red-50 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Total Inventory</p>
                        <h3 className="text-2xl font-serif font-bold text-zinc-900">{total}</h3>
                    </div>
                    <div className="p-3 bg-zinc-100 rounded-lg text-zinc-600">
                        <LayoutGrid size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Active Filters</p>
                        <div className="flex gap-2">
                            {(categoryFilter || stockFilter !== 'all' || searchQuery) ? (
                                <>
                                    {stockFilter !== 'all' && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-md font-medium">{stockFilter === 'true' ? 'In Stock' : 'Out of Stock'}</span>}
                                    {categoryFilter && <span className="text-xs bg-zinc-100 text-zinc-800 px-2 py-1 rounded-md font-medium">{categoryFilter}</span>}
                                    {searchQuery && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">Search</span>}
                                </>
                            ) : (
                                <span className="text-sm font-medium text-zinc-400">None</span>
                            )}
                        </div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <Filter size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Quick Actions</p>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="text-sm font-bold text-amber-600 hover:text-amber-700 hover:underline"
                        >
                            + Add New Item
                        </button>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-emerald-600">
                        <Plus size={20} />
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                        {isBangles ? 'Bangles' : 'Sarees'} List
                    </h2>
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-full">{total}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-amber-500/50 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {/* Status Filter */}
                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="px-3 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-amber-500/50 rounded-lg text-sm outline-none cursor-pointer hover:bg-gray-100 transition-all font-medium text-zinc-700"
                        >
                            <option value="all">All Status</option>
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>

                        {/* Category Filter */}
                        {!isBangles && (
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-3 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-amber-500/50 rounded-lg text-sm outline-none cursor-pointer hover:bg-gray-100 transition-all font-medium text-zinc-700"
                            >
                                <option value="">All Categories</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        )}

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-amber-500/50 rounded-lg text-sm outline-none cursor-pointer hover:bg-gray-100 transition-all font-medium text-zinc-700"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="name_asc">Name: A-Z</option>
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-lg shrink-0 ml-auto sm:ml-0">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            <List size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all font-medium text-sm shadow-lg shadow-zinc-900/20 whitespace-nowrap"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">Add Item</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="h-96 flex flex-col items-center justify-center text-zinc-400 animate-pulse">
                    <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4"></div>
                    <p>Loading inventory...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="h-96 flex flex-col items-center justify-center bg-white border border-dashed border-gray-200 rounded-2xl">
                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <PackageX size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-zinc-900 font-bold mb-1">No items found</h3>
                    <p className="text-zinc-500 text-sm mb-6">Try adjusting your filters or add a new item.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setCategoryFilter(''); setStockFilter('all'); }}
                        className="px-4 py-2 text-sm text-zinc-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {products.map(product => (
                                <ProductListItem key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-sm font-medium text-zinc-600 px-4">
                                Page {page} of {pages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(pages, p + 1))}
                                disabled={page === pages}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <ProductForm
                    onClose={handleFormClose}
                    initialData={editingProduct}
                    defaultCategory={categoryFilter || (isBangles ? 'Bangles' : '')}
                    defaultNewArrival={filterNewArrivals}
                />
            )}
        </div>
    );
};

export default ProductList;
