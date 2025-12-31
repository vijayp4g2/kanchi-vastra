import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    Filter,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Loader,
    Package,
    X,
    LayoutGrid,
    List,
    MoreVertical,
    CheckCircle,
    AlertCircle
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
    const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'

    // Actions & UI States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeActionId, setActiveActionId] = useState(null); // For mobile dropdowns if needed

    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState('newest');
    const [categoryFilter, setCategoryFilter] = useState(initialCategory);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Derived Constants
    const isBangles = initialCategory === 'Bangles';
    const itemTypeLabel = isBangles ? 'Bangle' : (filterNewArrivals ? 'Item' : 'Saree');
    const itemTypeLabelPlural = isBangles ? 'Bangles' : (filterNewArrivals ? 'New Arrivals' : 'Sarees');

    // Categories List
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
                pageSize: viewMode === 'grid' ? 12 : 10, // Slightly more for grid
                sort: sortBy,
                category: categoryFilter
            };

            // Handle specific logic for Bangles vs General Products page
            if (isBangles) {
                params.category = 'Bangles';
            }
            if (filterNewArrivals) {
                params.isNewArrival = true;
            }

            const data = await api.getProducts(params);
            let filteredProducts = data.products || [];

            // Client-side filtering to exclude Bangles from the general Saree list if not strictly filtered
            // Only apply this exclusion if we are NOT in Bangles mode, NOT in New Arrivals mode, and NO category filter is set
            if (!isBangles && !filterNewArrivals && !categoryFilter) {
                filteredProducts = filteredProducts.filter(p => p.category !== 'Bangles');
            }

            setProducts(filteredProducts);
            setPages(data.pages || 1);
            setTotal(data.total || 0);
        } catch (error) {
            console.error(error);
            addToast(`Failed to load ${itemTypeLabelPlural.toLowerCase()}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sortBy, categoryFilter, initialCategory, filterNewArrivals, viewMode]);

    // Search Debounce using Effect
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
        if (window.confirm(`Are you sure you want to delete this ${itemTypeLabel.toLowerCase()}? This action cannot be undone.`)) {
            try {
                await api.deleteProduct(id, user.token);
                addToast(`${itemTypeLabel} deleted successfully`, 'success');
                // Optimistic update or refetch
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

    // --- Sub-Components for this page ---

    const StatusBadge = ({ inStock }) => (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${inStock
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            : 'bg-rose-50 text-rose-700 border border-rose-100'
            }`}>
            {inStock ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
            {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
    );

    const CategoryBadge = ({ category }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold text-gray-500 bg-gray-100 uppercase tracking-wider group-hover:bg-white/80 transition-colors">
            {category}
        </span>
    );

    const GridItem = ({ product }) => (
        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-maroon-900/5 hover:border-maroon-100 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        onClick={(e) => handleEdit(product, e)}
                        className="p-3 bg-white text-maroon-900 rounded-full hover:bg-maroon-50 transition-colors transform hover:scale-110"
                        title="Edit"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={(e) => handleDelete(product.id, e)}
                        className="p-3 bg-white text-rose-600 rounded-full hover:bg-rose-50 transition-colors transform hover:scale-110"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <StatusBadge inStock={product.inStock} />
                    {product.featured && (
                        <span className="px-2 py-1 bg-gold-400 text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <CategoryBadge category={product.category} />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2" title={product.name}>
                    {product.name}
                </h3>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="font-bold text-maroon-900 text-lg">₹{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 font-medium">ID: {product.id.substring(0, 6)}...</span>
                </div>
            </div>
        </div>
    );

    const ListItem = ({ product }) => (
        <tr className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative group-hover:shadow-md transition-all">
                        <img
                            src={product.image || 'https://via.placeholder.com/150'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-maroon-900 transition-colors">{product.name}</h4>
                        <div className="flex items-center gap-2">
                            {product.featured && <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">• Featured</span>}
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">ID: {product.id}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <CategoryBadge category={product.category} />
            </td>
            <td className="px-6 py-4">
                <div className="font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
            </td>
            <td className="px-6 py-4">
                <StatusBadge inStock={product.inStock} />
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => handleEdit(product, e)}
                        className="p-2 text-gray-400 hover:text-maroon-700 hover:bg-maroon-50 rounded-lg transition-all"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={(e) => handleDelete(product.id, e)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20 animate-fadeIn">
            {/* --- Top Header Section --- */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30 px-6 py-4 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-maroon-900 flex items-center gap-3">
                                {filterNewArrivals ? 'New Arrivals' : (isBangles ? 'Bangles Collection' : 'Premium Sarees')}
                                <span className="px-3 py-1 bg-maroon-50 rounded-full text-xs font-sans font-bold text-maroon-600 tracking-wider uppercase">
                                    Admin
                                </span>
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Manage your exclusive {itemTypeLabel.toLowerCase()} inventory
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-maroon-900 to-maroon-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-maroon-900/20 hover:shadow-maroon-900/30 hover:to-maroon-700 transform hover:-translate-y-0.5 transition-all"
                            >
                                <Plus size={18} strokeWidth={2.5} />
                                Add New {itemTypeLabel}
                            </button>
                        </div>
                    </div>

                    {/* --- Controls Toolbar --- */}
                    <div className="mt-6 flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder={`Search ${itemTypeLabelPlural.toLowerCase()}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-maroon-100 focus:ring-4 focus:ring-maroon-50 rounded-xl text-sm font-medium transition-all outline-none placeholder:text-gray-400"
                            />
                        </div>

                        {/* Filters & Actions Group */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Sort */}
                            <div className="relative group">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none hover:border-maroon-200 transition-colors cursor-pointer shadow-sm"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                </select>
                                <ArrowUpDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Category Filter Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                    className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-all shadow-sm ${categoryFilter
                                        ? 'bg-maroon-50 border-maroon-200 text-maroon-800'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-maroon-200'
                                        }`}
                                >
                                    <Filter size={16} />
                                    {categoryFilter || 'All Categories'}
                                    {isFilterDropdownOpen ? <X size={14} /> : null}
                                </button>

                                {isFilterDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsFilterDropdownOpen(false)}></div>
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                                            <button
                                                onClick={() => { setCategoryFilter(''); setIsFilterDropdownOpen(false); }}
                                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${!categoryFilter ? 'font-bold text-maroon-900 bg-maroon-50/50' : 'text-gray-600'}`}
                                            >
                                                All Categories
                                            </button>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => { setCategoryFilter(cat); setIsFilterDropdownOpen(false); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${categoryFilter === cat ? 'font-bold text-maroon-900 bg-maroon-50/50' : 'text-gray-600'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="w-px h-8 bg-gray-200 mx-1"></div>

                            {/* View Toggle */}
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-maroon-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <List size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-maroon-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutGrid size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Main Content Area --- */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Summary - Optional but nice */}
                {!loading && (
                    <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-maroon-50 text-maroon-600 rounded-lg">
                                <Package size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Items</p>
                                <p className="text-2xl font-serif font-bold text-gray-900">{total}</p>
                            </div>
                        </div>
                        {/* Can add more stats here easily */}
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                        <Loader className="animate-spin text-maroon-900 mb-4" size={40} />
                        <p className="font-medium text-lg">Loading your collection...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 border-dashed">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Package size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No {itemTypeLabelPlural.toLowerCase()} found</h3>
                        <p className="text-gray-500 max-w-sm text-center mb-8">
                            We couldn't find any items matching your current filters. Try adjusting your search or add a new {itemTypeLabel.toLowerCase()}.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setCategoryFilter(''); }}
                            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <GridItem key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <th className="px-6 py-4">{itemTypeLabel} Details</th>
                                                <th className="px-6 py-4">Category</th>
                                                <th className="px-6 py-4">Price</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <ListItem key={product.id} product={product} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                        {pages > 1 && (
                            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                                <p className="text-sm text-gray-500 font-medium">
                                    Showing page <span className="text-maroon-900 font-bold">{page}</span> of {pages}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-maroon-200 hover:text-maroon-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setPage(p => Math.min(pages, p + 1))}
                                        disabled={page === pages}
                                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-maroon-200 hover:text-maroon-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Editor Modal */}
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
