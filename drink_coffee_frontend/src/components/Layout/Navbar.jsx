import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Coffee, ShoppingCart, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';

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
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo - left top, styled as previous */}
          <Link to="/" className="flex items-center space-x-2" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '0.06em', color: 'var(--color-primary)', textShadow: '0 4px 24px rgba(124,60,237,0.10), 0 1.5px 4px rgba(0,0,0,0.08)', fontFamily: '"Segoe UI", "Inter", Arial, sans-serif', lineHeight: 1.1 }}>
            <span style={{ fontSize: '1.5em', marginRight: '0.2em' }}><Coffee className="h-8 w-8" /></span>
            Drink <span style={{ color: 'var(--color-accent)', marginLeft: '0.2em' }}>Coffee</span>
          </Link>

          {/* Profile Dropdown - right top */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-amber-200 hover:bg-amber-800">
                    <User className="h-6 w-6" />
                    <span className="font-semibold">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/cart" className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" /> Cart
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center gap-2">
                      <span className="material-icons">receipt_long</span> Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled className="flex items-center gap-2">
                    <User className="h-5 w-5" /> {user.username}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-5 w-5" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

