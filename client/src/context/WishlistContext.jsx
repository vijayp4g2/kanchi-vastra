import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { addToast } = useToast();
    const [wishlist, setWishlist] = useState(() => {
        try {
            const localWishlist = localStorage.getItem('wishlist');
            return localWishlist ? JSON.parse(localWishlist) : [];
        } catch (error) {
            console.error('Failed to parse wishlist from local storage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Failed to save wishlist to local storage:', error);
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            if (prevWishlist.some((item) => item.id === product.id)) {
                return prevWishlist; // Already in wishlist
            }
            return [...prevWishlist, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            addToast(`Removed ${product.name} from wishlist`, 'info');
        } else {
            addToWishlist(product);
            addToast(`Added ${product.name} to wishlist`, 'success');
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
                wishlistCount: wishlist.length
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
