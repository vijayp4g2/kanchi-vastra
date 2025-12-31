import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    // Check if user is authenticated and has admin role
    // For now, if no role is defined in mock, we'll allow if logged in, 
    // but in production this MUST check role.
    if (!user) {
        return <Navigate to="/account" replace />;
    }

    if (user.role !== 'admin' && user.email !== 'admin@kanchivastra.com') { // Hardcoded fallback for dev
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
