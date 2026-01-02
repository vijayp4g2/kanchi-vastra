import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Bell, Search, Calendar } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    // Get page title based on path
    const getPageTitle = (path) => {
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart === 'admin') return 'Dashboard';

        // Handle kebab-case
        return lastPart
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar Component */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Top Bar */}
                <header className="h-16 lg:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4 ml-12 lg:ml-0">
                        <h1 className="text-lg lg:text-2xl font-serif text-zinc-900 font-bold tracking-tight">
                            {getPageTitle(location.pathname)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        {/* Search Bar - Clean */}
                        <div className="hidden xl:flex items-center bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 focus-within:ring-2 focus-within:ring-amber-500/10 focus-within:border-amber-500/50 transition-all w-80">
                            <Search size={18} className="text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Global Search..."
                                className="bg-transparent border-none outline-none text-sm text-gray-700 w-full placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 lg:p-2.5 text-gray-400 hover:text-zinc-900 hover:bg-gray-100 rounded-lg transition-all group">
                            <Bell size={18} className="lg:w-5 lg:h-5" />
                            <span className="absolute top-2 right-2 lg:top-2.5 lg:right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

                        {/* Date Display */}
                        <div className="hidden md:flex items-center gap-3 text-right">
                            <div className="hidden lg:block">
                                <span className="block text-sm font-bold text-zinc-900 leading-none">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                    {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="p-2 bg-zinc-100 rounded-lg text-zinc-500">
                                <Calendar size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main View Port */}
                <main className="flex-1 p-4 lg:p-8 xl:p-10 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
