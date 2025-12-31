import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Layers,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Home as HomeIcon,
    PieChart,
    PlusCircle,
    Circle,
    Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { icon: ShoppingBag, label: 'Sarees', path: '/admin/products' },
        { icon: Star, label: 'New Arrivals', path: '/admin/new-arrivals' },
        { icon: Circle, label: 'Bangles', path: '/admin/bangles' },
        { icon: Layers, label: 'Categories', path: '/admin/categories' },
        { icon: PieChart, label: 'Analytics', path: '/admin/analytics' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/account');
    };

    return (
        <aside
            className={`bg-maroon-900 h-screen sticky top-0 transition-all duration-300 flex flex-col shadow-xl z-20 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header / Logo Section */}
            <div className="p-6 flex items-center justify-between border-b border-maroon-800/50">
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <span className="text-gold-400 font-serif text-xl font-bold tracking-tight">Kanchi Vastra</span>
                        <span className="text-gold-200/60 text-[10px] uppercase tracking-[0.2em] -mt-1 font-medium">Admin Panel</span>
                    </div>
                )}
                {isCollapsed && (
                    <span className="text-gold-400 font-serif text-2xl font-bold mx-auto">KV</span>
                )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative ${isActive
                                ? 'bg-gold-400/10 text-gold-400 border-l-4 border-gold-400'
                                : 'text-gold-100/70 hover:bg-gold-400/5 hover:text-gold-300'
                            }`
                        }
                    >
                        <item.icon size={22} className="min-w-[22px]" />
                        {!isCollapsed && (
                            <span className="font-medium tracking-wide text-sm">{item.label}</span>
                        )}
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                            <div className="absolute left-full ml-4 px-2 py-1 bg-maroon-800 text-gold-200 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 space-y-2 border-t border-maroon-800/50">
                {/* Back to Site */}
                <NavLink
                    to="/"
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-gold-100/70 hover:bg-gold-400/5 transition-all group relative"
                >
                    <HomeIcon size={20} className="min-w-[20px]" />
                    {!isCollapsed && <span className="text-sm">View Website</span>}
                </NavLink>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-lg text-gold-100/50 hover:bg-gold-400/10 hover:text-gold-300 transition-all border border-maroon-800/30"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>

                {/* User & Logout */}
                <div className={`mt-4 pt-4 border-t border-maroon-800/30 overflow-hidden ${isCollapsed ? 'items-center' : 'px-2'}`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center text-gold-400 text-xs font-bold">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-semibold text-gold-200 truncate">{user?.name || 'Admin'}</p>
                                <p className="text-[10px] text-gold-100/40 truncate">Store Owner</p>
                            </div>
                        )}
                        {!isCollapsed && (
                            <button
                                onClick={handleLogout}
                                className="text-gold-200/40 hover:text-red-400 transition-colors"
                                title="Log Out"
                            >
                                <LogOut size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
