import React from 'react';
import ProductList from './ProductList'; // Assuming products page is shared with customers

const CustomerDashboard = ({ products, addToCart }) => {
  return (
    <div className="container">
      <h1>Customer Dashboard</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default CustomerDashboard;