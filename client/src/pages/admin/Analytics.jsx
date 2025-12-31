import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    ShoppingBag,
    Users,
    Package,
    DollarSign,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard
} from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const Analytics = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        avgOrderValue: 0,
        recentOrders: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch basic data
                // Note: In a real large-scale app, these should be dedicated analytics endpoints
                const [productsData, ordersData] = await Promise.all([
                    api.getProducts(),
                    api.getOrders(user.token)
                ]);

                const products = productsData.products || [];
                const orders = ordersData || [];

                // Calculate calculations
                const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
                const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

                setStats({
                    totalRevenue,
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    avgOrderValue,
                    recentOrders: orders.slice(0, 5) // Top 5 recent
                });

            } catch (error) {
                console.error("Analytics load failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.token]);

    const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-zinc-50 rounded-xl text-zinc-900 border border-zinc-100">
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>12.5%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-zinc-900 mb-1">{value}</h3>
                <p className="text-xs text-zinc-400 font-medium">{subtext}</p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">

            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-zinc-900">Dashboard Overview</h2>
                <p className="text-sm text-zinc-500">Track your store's performance and growth</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    subtext="Lifetime earnings"
                    icon={DollarSign}
                    trend="up"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    subtext="Orders processed"
                    icon={ShoppingBag}
                    trend="up"
                />
                <StatCard
                    title="Active Products"
                    value={stats.totalProducts}
                    subtext="Inventory count"
                    icon={Package}
                />
                <StatCard
                    title="Avg. Order Value"
                    value={`₹${Math.round(stats.avgOrderValue).toLocaleString()}`}
                    subtext="Per transaction"
                    icon={TrendingUp}
                    trend="up"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Activity Table */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <CreditCard size={18} className="text-zinc-400" />
                            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Recent Orders</h3>
                        </div>
                        <button className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-zinc-500 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stats.recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-zinc-400">
                                            No recent orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    stats.recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-zinc-500 text-xs">
                                                #{order._id.substring(order._id.length - 6).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-zinc-900">
                                                {order.user?.name || order.shippingAddress?.fullName || 'Guest'}
                                            </td>
                                            <td className="px-6 py-4 text-zinc-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-zinc-900">
                                                ₹{order.totalPrice?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${order.isPaid
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        : 'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                    {order.isPaid ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Visualization / Side Panel */}
                <div className="space-y-6">
                    {/* Performance Summary */}
                    <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-xl shadow-zinc-900/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="font-bold text-lg mb-1 relative z-10">Monthly Goal</h3>
                        <div className="flex items-baseline gap-1 mb-4 relative z-10">
                            <span className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</span>
                            <span className="text-zinc-400 text-sm">/ ₹50,000</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full mb-4 relative z-10 overflow-hidden">
                            <div
                                className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min((stats.totalRevenue / 50000) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-zinc-400 relative z-10">
                            You've reached {Math.round((stats.totalRevenue / 50000) * 100)}% of your monthly sales target. Keep it up!
                        </p>
                    </div>

                    {/* Quick Stats List */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Inventory Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500 text-sm">Active Products</span>
                                <span className="font-bold text-zinc-900">{stats.totalProducts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500 text-sm">Out of Stock</span>
                                <span className="text-xs font-bold px-2 py-0.5 bg-rose-50 text-rose-600 rounded">2 Items</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-500 text-sm">Low Stock</span>
                                <span className="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded">5 Items</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Analytics;
