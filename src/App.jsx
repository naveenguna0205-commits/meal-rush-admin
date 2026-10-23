import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/common/Toast';
import ConflictModal from './components/common/ConflictModal';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
            <ScrollToTop />
            
            {/* Global Navbar */}
            <Navbar />

            {/* Main Page Content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>

            {/* Global Slide-Over Cart Drawer */}
            <CartDrawer />

            {/* Multi-Restaurant Conflict Modal */}
            <ConflictModal />

            {/* Floating Toast Notification */}
            <Toast />

            {/* Global Footer */}
            <Footer />
          </div>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
