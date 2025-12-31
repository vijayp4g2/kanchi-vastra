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
        try {
            const data = await api.getProducts(params);
            // api.getProducts already transforms the data
            setProducts(data.products || []);
            setLoading(false);
        } catch (err) {
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
