import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Plus, Minus } from 'lucide-react';

const CoffeeItem = ({ coffee }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    setLoading(true);
    const result = await addToCart(coffee.id, quantity);
    
    if (result.success) {
      setQuantity(1); // Reset quantity after adding
    } else {
      alert(result.error || 'Failed to add to cart');
    }
    
    setLoading(false);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={coffee.image_url || '/placeholder-coffee.jpg'}
          alt={coffee.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop';
          }}
        />
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{coffee.name}</CardTitle>
        <CardDescription>{coffee.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-amber-600">
            ${parseFloat(coffee.price).toFixed(2)}
          </span>
        </div>

        {user && (
          <div className="space-y-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {loading ? 'Adding...' : `Add ${quantity} to Cart`}
            </Button>
          </div>
        )}

        {!user && (
          <div className="text-center text-gray-500">
            <p>Please log in to add to cart</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoffeeItem;

