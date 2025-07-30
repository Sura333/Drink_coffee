import React, { useState, useEffect } from 'react';
import CoffeeItem from './CoffeeItem';

const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCoffees();
  }, []);

  const loadCoffees = async () => {
    try {
      const response = await fetch('/api/v1/coffees');
      
      if (response.ok) {
        const data = await response.json();
        setCoffees(data);
      } else {
        setError('Failed to load coffee menu');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading coffee menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Coffee Menu</h1>
        <p className="text-lg text-gray-600">Discover your perfect cup of coffee</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coffees.map((coffee) => (
          <CoffeeItem key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export default CoffeeList;

