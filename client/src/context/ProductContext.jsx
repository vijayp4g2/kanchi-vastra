import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            // CRITICAL FIX: Always fetch ALL products by setting high pageSize
            // This ensures frontend gets complete product inventory
            const data = await api.getProducts({
                ...params,
                pageSize: params.pageSize || 1000  // Default to 1000 to get all products
            });
            // api.getProducts already transforms the data
            const transformedProducts = data.products || [];
            setProducts(transformedProducts);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
