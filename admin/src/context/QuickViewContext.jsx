import React, { createContext, useContext, useState } from 'react';

const QuickViewContext = createContext();

export const useQuickView = () => {
    const context = useContext(QuickViewContext);
    if (!context) {
        throw new Error('useQuickView must be used within a QuickViewProvider');
    }
    return context;
};

export const QuickViewProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openQuickView = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeQuickView = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // Clear after animation
    };

    return (
        <QuickViewContext.Provider value={{ isOpen, selectedProduct, openQuickView, closeQuickView }}>
            {children}
        </QuickViewContext.Provider>
    );
};
