import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [rebateProducts, setRebateProducts] = useState([]);

  useEffect(() => {
    // Fetch all products and available stock
    axios.get('http://localhost:3001/inventory/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Fetch data for Bar Chart
    axios.get('http://localhost:3001/inventory/products/bar-chart')
      .then(response => {
        setBarChartData(response.data);
      })
      .catch(error => {
        console.error('Error fetching bar chart data:', error);
      });

    // Fetch products currently on sale
    axios.get('http://localhost:3001/inventory/products/sale')
      .then(response => {
        setSaleProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching sale products:', error);
      });

    // Fetch products with manufacturer rebates
    axios.get('http://localhost:3001/inventory/products/rebates')
      .then(response => {
        setRebateProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching rebate products:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Inventory Management</h1>

      {/* Table of all products and available stock */}
      <h2>All Products and Stock</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Available Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bar Chart for products and stock */}
      <h2>Product Stock Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Table of products currently on sale */}
      <h2>Products on Sale</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Discount ($)</th>
          </tr>
        </thead>
        <tbody>
          {saleProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.discount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table of products with manufacturer rebates */}
      <h2>Products with Manufacturer Rebates</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Rebate ($)</th>
          </tr>
        </thead>
        <tbody>
          {rebateProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.rebate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;