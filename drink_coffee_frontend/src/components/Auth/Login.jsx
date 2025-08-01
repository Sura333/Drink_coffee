import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { Coffee } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.username, formData.password);

       if (result.success) {
         navigate('/coffee');
       } else {
         setError(result.error);
       }

    setLoading(false);
  };

  return (
      <div className="main-content flex-center" style={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--color-background)' }}>
        <span
          className="logo"
          style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            letterSpacing: '0.06em',
            color: 'var(--color-primary)',
            textShadow: '0 4px 24px rgba(124,60,237,0.10), 0 1.5px 4px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            fontFamily: '"Segoe UI", "Inter", Arial, sans-serif',
            margin: '2.5rem 0 1.5rem 0',
            lineHeight: 1.1
          }}
        >
          <span style={{ fontSize: '2.2em', marginRight: '0.2em' }}>☕</span>
          Drink <span style={{ color: 'var(--color-accent)', marginLeft: '0.2em' }}>Coffee</span>
        </span>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Coffee className="h-12 w-12 text-amber-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Drink Coffee account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
               {error && (
                 <div className="bg-red-50 border border-red-200 px-4 py-3 rounded" style={{ color: '#dc2626', fontWeight: 600, fontSize: '1rem', textAlign: 'center' }}>
                   {error}
                 </div>
               )}

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-amber-600 hover:text-amber-700 font-medium">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

