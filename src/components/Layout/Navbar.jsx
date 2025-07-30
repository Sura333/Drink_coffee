import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Coffee, ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-amber-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" />
            <span className="text-xl font-bold">Drink Coffee</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-amber-200 transition-colors">
              Menu
            </Link>

            {user ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative hover:text-amber-200 transition-colors">
                  <div className="flex items-center space-x-1">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart</span>
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Orders */}
                <Link to="/orders" className="hover:text-amber-200 transition-colors">
                  Orders
                </Link>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.username}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white hover:text-amber-200 hover:bg-amber-800"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-amber-200 hover:bg-amber-800">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

