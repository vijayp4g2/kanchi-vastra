import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Store,
    PieChart,
    Sparkles,
    Gem,
    Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { icon: ShoppingBag, label: 'Sarees Collection', path: '/admin/products' },
        { icon: Sparkles, label: 'New Arrivals', path: '/admin/new-arrivals' },
        { icon: Gem, label: 'Bangles', path: '/admin/bangles' },
        { icon: Layers, label: 'Categories', path: '/admin/categories' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/account');
    };

    return (
        <>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-5 left-4 z-50 p-2.5 bg-zinc-900 text-white rounded-lg shadow-lg hover:bg-zinc-800 transition-all"
                aria-label="Toggle menu"
            >
                <Menu size={20} />
            </button>

            <aside
                className={`bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0 transition-all duration-300 flex flex-col z-50 text-white
                    ${isCollapsed ? 'w-20' : 'w-72'}
                    lg:translate-x-0 
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    fixed lg:sticky
                `}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-800">
                    {!isCollapsed ? (
                        <div className="flex flex-col animate-in fade-in duration-300">
                            <span className="font-serif text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                                Kanchi Vastra
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Control Panel</span>
                        </div>
                    ) : (
                        <span className="font-serif text-2xl font-bold text-amber-500 mx-auto">KV</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-700">
                    <div className="mb-2 px-3 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                        {!isCollapsed && 'Inventory'}
                    </div>

                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                    ? 'bg-amber-500/10 text-amber-500 shadow-sm shadow-amber-900/10'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`
                            }
                        >
                            <item.icon size={20} className={`transition-transform duration-200 ${!isCollapsed && 'group-hover:scale-110'}`} />
                            {!isCollapsed && (
                                <span className="font-medium text-sm tracking-wide">{item.label}</span>
                            )}

                            {/* Status Indicator for Active */}
                            {({ isActive }) => isActive && !isCollapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                            )}

                            {/* Collapsed Tooltip */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded border border-zinc-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[60]">
                                    {item.label}
                                </div>
                            )}
                        </NavLink>
                    ))}

                    <div className="my-6 border-t border-zinc-800 mx-3" />

                    <div className="mb-2 px-3 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                        {!isCollapsed && 'System'}
                    </div>

                    <NavLink
                        to="/admin/analytics"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`
                        }
                    >
                        <PieChart size={20} />
                        {!isCollapsed && <span className="font-medium text-sm tracking-wide">Analytics</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`
                        }
                    >
                        <Settings size={20} />
                        {!isCollapsed && <span className="font-medium text-sm tracking-wide">Settings</span>}
                    </NavLink>
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                    <NavLink
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 mb-4 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all text-xs font-bold uppercase tracking-wider"
                    >
                        <Store size={16} />
                        {!isCollapsed && "Live Store"}
                    </NavLink>

                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-900 font-bold text-sm shadow-md">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 overflow-hidden">
                                <h4 className="text-sm font-semibold text-white truncate">{user?.name}</h4>
                                <p className="text-[10px] text-zinc-500 truncate">Administrator</p>
                            </div>
                        )}
                        {!isCollapsed && (
                            <button
                                onClick={handleLogout}
                                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Sign Out"
                            >
                                <LogOut size={16} />
                            </button>
                        )}
                    </div>

                    {/* Desktop Collapse Button - Hidden on Mobile */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-800 border-2 border-zinc-700 rounded-full items-center justify-center text-zinc-400 hover:text-white hover:border-amber-500 transition-all z-50 shadow-sm"
                    >
                        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
