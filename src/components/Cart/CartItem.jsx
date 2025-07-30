import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItem = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setLoading(true);
    const result = await updateCartItem(item.id, newQuantity);
    
    if (!result.success) {
      alert(result.error || 'Failed to update quantity');
    }
    
    setLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    const result = await removeFromCart(item.id);
    
    if (!result.success) {
      alert(result.error || 'Failed to remove item');
    }
    
    setLoading(false);
  };

  const incrementQuantity = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Coffee Image */}
          <img
            src={item.coffee.image_url || '/placeholder-coffee.jpg'}
            alt={item.coffee.name}
            className="w-16 h-16 object-cover rounded"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop';
            }}
          />

          {/* Coffee Details */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.coffee.name}</h3>
            <p className="text-gray-600">{item.coffee.description}</p>
            <p className="text-amber-600 font-bold">${item.coffee.price.toFixed(2)} each</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              disabled={loading || item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              disabled={loading}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Price and Remove */}
          <div className="text-right">
            <div className="text-lg font-bold">
              ${(item.coffee.price * item.quantity).toFixed(2)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={loading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;

