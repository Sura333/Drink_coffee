import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Import all components
import Navbar from './components/Layout/Navbar';
import CoffeeList from './components/Coffee/CoffeeList';
import GetStarted from './components/GetStarted';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cart from './components/Cart/Cart';
import OrderHistory from './components/Order/OrderHistory';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  return (
    // Wrap the entire application with Auth and Cart providers
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Define all the routes for the application */}
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/coffee" element={<div className="min-h-screen bg-gray-50"><Navbar /><CoffeeList /></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected route for the shopping cart */}
            <Route
              path="/cart"
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                </div>
              }
            />

            {/* Protected route for order history */}
            <Route
              path="/orders"
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                </div>
              }
            />

            {/* Catch-all route for any undefined paths, redirecting to the GetStarted page */}
            <Route path="*" element={<GetStarted />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
