import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { addToast } = useToast();
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        addToast(`Added ${product.name} to cart`, 'success');
    };

    const removeFromCart = (productId) => {
        const itemToRemove = cart.find(item => item.id === productId);
        if (itemToRemove) {
            addToast(`Removed ${itemToRemove.name} from cart`, 'info');
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        }
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity === 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
            )
        );
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
