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
        const parsedCart = localCart ? JSON.parse(localCart) : [];
        // Migration: Ensure all items have cartItemId
        return parsedCart.map(item => {
            if (!item.cartItemId) {
                let cid = item.id || item._id;
                if (item.selectedPack) cid += `-${item.selectedPack.packLabel}`;
                if (item.selectedSize) cid += `-${item.selectedSize}`;
                return { ...item, cartItemId: cid };
            }
            return item;
        });
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            let cartItemId = product.id || product._id;

            if (product.selectedPack) {
                cartItemId += `-${product.selectedPack.packLabel}`;
            }
            // FIXED: Also append size if present, even if pack is selected (e.g. Pack of 4, Size 2.4)
            if (product.selectedSize) {
                cartItemId += `-${product.selectedSize}`;
            }

            const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);

            // If item has selectedPack, ensure we use that price
            const itemToAdd = {
                ...product,
                cartItemId,
                price: product.selectedPack ? product.selectedPack.price : product.price,
                selectedSize: product.selectedSize // Ensure size is explicitly saved
            };

            if (existingItem) {
                return prevCart.map((item) =>
                    item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...itemToAdd, quantity: 1 }];
        });
        addToast(`Added ${product.name} to cart`, 'success');
    };

    const removeFromCart = (cartItemId) => {
        // Find index to be more direct, and check multiple possible ID fields for safety
        const itemToRemove = cart.find(item =>
            item.cartItemId === cartItemId ||
            item.id === cartItemId ||
            item._id === cartItemId
        );

        if (itemToRemove) {
            addToast(`Removed ${itemToRemove.name} from cart`, 'info');
            setCart((prevCart) => prevCart.filter((item) =>
                item.cartItemId !== cartItemId &&
                item.id !== cartItemId &&
                item._id !== cartItemId
            ));
        }
    };

    const updateQuantity = (cartItemId, quantity) => {
        if (quantity === 0) {
            removeFromCart(cartItemId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                (item.cartItemId === cartItemId || item.id === cartItemId || item._id === cartItemId)
                    ? { ...item, quantity: Math.max(0, quantity) }
                    : item
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
