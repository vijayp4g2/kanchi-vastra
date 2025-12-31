import React, { useState } from 'react';
import {
    User,
    Lock,
    Store,
    Save,
    ShieldCheck,
    Bell,
    Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';

const Settings = () => {
    const { user, login } = useAuth(); // Assuming login updates user context, or I need a way to refresh user
    const { addToast } = useToast();

    // Local State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await api.updateProfile(profileData, user.token);
            addToast('Profile updated successfully', 'success');
            // Normally we'd update context here, but depending on implementation:
            // if login() accepts user object, we might use that, or just rely on state for now.
        } catch (error) {
            addToast(error.message || 'Update failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.password !== passwordData.confirmPassword) {
            addToast('Passwords do not match', 'error');
            return;
        }
        setLoading(true);
        try {
            await api.updateProfile({ password: passwordData.password }, user.token);
            addToast('Password updated successfully', 'success');
            setPasswordData({ password: '', confirmPassword: '' });
        } catch (error) {
            addToast(error.message || 'Password update failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">

            {/* Page Header */}
            <div>
                <h2 className="text-xl font-bold text-zinc-900">Settings</h2>
                <p className="text-sm text-zinc-500">Manage your account and store preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-zinc-900 text-white rounded-lg">
                            <User size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-900 text-sm">Personal Information</h3>
                            <p className="text-xs text-zinc-500">Update your public profile details</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Full Name</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Email Address</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-sm"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-zinc-800 transition-all disabled:opacity-50 shadow-lg shadow-zinc-900/10"
                            >
                                <Save size={16} />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-amber-500 text-white rounded-lg">
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-900 text-sm">Security</h3>
                            <p className="text-xs text-zinc-500">Manage your password and access</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <form onSubmit={handlePasswordUpdate} className="max-w-lg space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                                    placeholder="Enter new password"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="Confirm new password"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading || !passwordData.password}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-zinc-900 rounded-lg font-bold text-sm hover:bg-gray-50 hover:border-amber-500 hover:text-amber-600 transition-all disabled:opacity-50"
                            >
                                <Save size={16} />
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Store Information (Read Only / Mock) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden opacity-80">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-200 text-gray-600 rounded-lg">
                            <Store size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-900 text-sm">Store Configuration</h3>
                            <p className="text-xs text-zinc-500">Contact admin for store-level changes</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded">Read Only</span>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-zinc-400 uppercase">Store Name</span>
                        <p className="font-serif font-bold text-zinc-900 text-lg">Kanchi Vastra</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-zinc-400 uppercase">Currency</span>
                        <p className="font-bold text-zinc-900 flex items-center gap-1">INR (₹)</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-zinc-400 uppercase">System Contact</span>
                        <p className="font-medium text-zinc-900 flex items-center gap-2"><Mail size={14} /> admin@kanchivastra.com</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-zinc-400 uppercase">Environment</span>
                        <p className="font-medium text-zinc-900 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Production
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Settings;
