import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Bell, Search, User } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    // Get page title based on path
    const getPageTitle = (path) => {
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart === 'dashboard') return 'Overview';
        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    }

    return (
        <div className="flex min-h-screen bg-cream-50 font-sans">
            {/* Sidebar Component */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Top Bar */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-serif text-maroon-900 font-bold">
                            {getPageTitle(location.pathname)}
                        </h1>
                        <span className="h-6 w-[1px] bg-gray-200 hidden md:block"></span>
                        <p className="text-gray-400 text-sm hidden md:block font-medium">
                            Kanchi Vastra Administrative Control
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Bar - Aesthetic Focus */}
                        <div className="hidden lg:flex items-center bg-cream-50 rounded-xl px-4 py-2 border border-gray-100 group transition-all focus-within:ring-2 focus-within:ring-maroon-900/10 focus-within:border-maroon-900/20">
                            <Search size={18} className="text-gray-400 group-focus-within:text-maroon-700 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products, orders..."
                                className="bg-transparent border-none outline-none px-3 text-sm text-gray-700 w-64 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-500 hover:text-maroon-700 hover:bg-cream-50 rounded-full transition-all group">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-gray-200"></div>

                        {/* Quick Action / Date Display */}
                        <div className="flex flex-col items-end pr-2 text-right">
                            <span className="text-sm font-bold text-maroon-900 leading-tight">
                                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">System Online</span>
                        </div>
                    </div>
                </header>

                {/* Main View Port */}
                <main className="flex-1 p-8 lg:p-10 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer for Admin Panel */}
                <footer className="px-8 py-6 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-medium">
                        &copy; {new Date().getFullYear()} Kanchi Vastra • Secure Enterprise Architecture
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
