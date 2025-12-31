import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import ProductList from './pages/admin/ProductList';
import CategoryList from './pages/admin/CategoryList';
import AdminRoute from './components/admin/AdminRoute';
import Account from './pages/Account';

import { QuickViewProvider } from './context/QuickViewContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import QuickViewModal from './components/common/QuickViewModal';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Simplified LayoutWrapper for Admin - possibly not needed if AdminLayout handles everything, 
// but useful if we have a login page (Account) outside AdminLayout.
const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin doesn't use the public Header/Footer */}
      {/* <QuickViewModal /> might be useful if Admin browses products? Leaving it in just in case or removing. */}
      {children}
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          {/* Keep other providers to avoid context errors if reused components use them, though likely unused in Admin */}
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <Router basename="/admin">
                  <ScrollToTop />
                  <LayoutWrapper>
                    <Routes>
                      {/* Login Route */}
                      <Route path="/account" element={<Account />} />
                      <Route path="/login" element={<Navigate to="/account" replace />} />

                      {/* Admin Routes */}
                      <Route path="/" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                        <Route index element={<Navigate to="products" replace />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="bangles" element={<ProductList initialCategory="Bangles" />} />
                        <Route path="categories" element={<CategoryList />} />
                        <Route path="analytics" element={<div className="p-8 text-center text-gray-400">Analytics Coming Soon</div>} />
                        <Route path="settings" element={<div className="p-8 text-center text-gray-400">Settings Coming Soon</div>} />
                      </Route>

                      {/* Catch all */}
                      <Route path="*" element={<Navigate to="/products" replace />} />
                    </Routes>
                  </LayoutWrapper>
                </Router>
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
