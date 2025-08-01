import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Coffee, ShoppingCart, User, LogOut, Menu as MenuIcon, History as HistoryIcon } from 'lucide-react';
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
    <nav className="bg-amber-900 text-white shadow-lg" style={{ position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          {/* Logo - left top, styled as previous */}
          <Link to="/coffee" className="flex items-center space-x-2" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '0.06em', color: '#222', fontFamily: '"Segoe UI", "Inter", Arial, sans-serif', lineHeight: 1.1, textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5em', marginRight: '0.2em' }}>☕</span>
            Drink <span style={{ color: '#222', marginLeft: '0.2em' }}>Coffee</span>
          </Link>
          {/* Absolute right top menu icon */}
          <div style={{ position: 'absolute', right: 32, top: 16 }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center justify-center text-black hover:text-amber-600 hover:bg-amber-100 p-2" style={{ borderRadius: '50%', width: 44, height: 44 }}>
                  <MenuIcon className="h-7 w-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/cart" className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" /> Cart
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center gap-2">
                        <HistoryIcon className="h-5 w-5" /> History
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
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

