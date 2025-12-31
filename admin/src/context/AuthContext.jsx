import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const { addToast } = useToast();
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    });

    const login = async (email, password) => {
        try {
            const data = await api.login(email, password);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            addToast(`Welcome back, ${data.name}!`, 'success');
            return data;
        } catch (error) {
            addToast(error.message || 'Login failed', 'error');
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await api.register(name, email, password);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            addToast('Account created successfully!', 'success');
            return data;
        } catch (error) {
            addToast(error.message || 'Registration failed', 'error');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        addToast('Logged out successfully', 'info');
    };

    const updateUser = async (updates) => {
        try {
            if (!user || !user.token) throw new Error('Not authenticated');

            const updatedUser = await api.updateProfile(updates, user.token);

            // The API returns the updated user object (including token usually, or at least the fields)
            // We want to preserve the token if the API doesn't return it, but my controller does return it.

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            addToast('Profile updated successfully', 'success');
            return updatedUser;
        } catch (error) {
            console.error('Update Profile Error:', error);
            addToast(error.message || 'Failed to update profile', 'error');
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

