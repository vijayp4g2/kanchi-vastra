const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const transformProduct = (p) => ({
    ...p,
    id: p._id,
    image: (p.images && p.images.length > 0) ? p.images[0] : (p.image || '')
});

const getProducts = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/products?${query}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    if (data.products) {
        data.products = data.products.map(transformProduct);
    }
    return data;
};

const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    const data = await response.json();
    return transformProduct(data);
};

const createProduct = async (productData, token) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Create product failed');
    }
    return response.json();
};

const updateProduct = async (id, productData, token) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Update product failed');
    }
    return response.json();
};

const deleteProduct = async (id, token) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Delete product failed');
    }
    return response.json();
};

const uploadImage = async (formData, token) => {
    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });
    if (!response.ok) throw new Error('Image upload failed');
    return response.text();
};

const login = async (email, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        throw new Error(error.message || `Request failed: ${response.status}`);
    }
    return response.json();
};

const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        throw new Error(error.message || `Request failed: ${response.status}`);
    }
    return response.json();
};

const getProfile = async (token) => {
    const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
};

const updateProfile = async (userData, token) => {
    const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        throw new Error(error.message || `Request failed: ${response.status}`);
    }
    return response.json();
};

const getOrders = async (token) => {
    const response = await fetch(`${API_URL}/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};

const deleteOrder = async (id, token) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Delete order failed');
    }
    return response.json();
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    login,
    register,
    getProfile,
    updateProfile,
    getOrders,
    getOrders,
    deleteOrder,
    getCategories: async () => {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },
    createCategory: async (categoryData, token) => {
        const response = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoryData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Create category failed');
        }
        return response.json();
    },
    updateCategory: async (id, categoryData, token) => {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoryData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Update category failed');
        }
        return response.json();
    },
    deleteCategory: async (id, token) => {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Delete category failed');
        }
        return response.json();
    }
};
