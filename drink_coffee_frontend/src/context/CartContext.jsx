import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, getAuthHeaders } = useAuth();

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/v1/cart_items', {
        headers: {
          ...getAuthHeaders(),
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (coffeeId, quantity = 1) => {
    if (!user) return { success: false, error: 'Please log in to add items to cart' };
    
    try {
      const response = await fetch('/api/v1/cart_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ coffee_id: coffeeId, quantity }),
      });

      if (response.ok) {
        await loadCart(); // Reload cart to get updated data
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error || data.errors?.join(', ') };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!user) return { success: false, error: 'Please log in' };
    
    try {
      const response = await fetch(`/api/v1/cart_items/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
        },
      });

      if (response.ok) {
        await loadCart(); // Reload cart to get updated data
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const updateCartItem = async (cartItemId, quantity) => {
    if (!user) return { success: false, error: 'Please log in' };
    
    try {
      const response = await fetch(`/api/v1/cart_items/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        await loadCart(); // Reload cart to get updated data
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error || data.errors?.join(', ') };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.total_price;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateCartItem,
    getTotalPrice,
    getTotalItems,
    clearCart,
    loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

