import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import Shop from './pages/Shop';
import NewArrivals from './pages/NewArrivals';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';

import Contact from './pages/Contact';
import Bangles from './pages/Bangles';

import { QuickViewProvider } from './context/QuickViewContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import QuickViewModal from './components/common/QuickViewModal';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Account from './pages/Account';
import { ProductProvider } from './context/ProductContext';

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <QuickViewModal />
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <Router>
                  <ScrollToTop />
                  <LayoutWrapper>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/new-arrivals" element={<NewArrivals />} />
                      <Route path="/bangles" element={<Bangles />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
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
