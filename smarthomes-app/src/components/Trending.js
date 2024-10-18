import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

// Color palette for the Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333'];

const Trending = () => {
  const [topZips, setTopZips] = useState([]);
  const [topSoldProducts, setTopSoldProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]); // State for top-rated products

  // Fetch data for top Zip Codes, most sold products, and top-rated products
  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const [topZipsRes, topSoldProductsRes, topRatedProductsRes] = await Promise.all([
          fetch('http://localhost:3001/trending/top-zipcodes'), // API for top zip codes
          fetch('http://localhost:3001/trending/most-sold'), // API for most sold products
          fetch('http://localhost:3001/trending/most-liked') // API for top-rated products
        ]);

        // Check and set data for top zip codes
        if (topZipsRes.ok) {
          const topZipsData = await topZipsRes.json();
          setTopZips(topZipsData);
        }

        // Check and set data for most sold products
        if (topSoldProductsRes.ok) {
          const topSoldProductsData = await topSoldProductsRes.json();
          setTopSoldProducts(topSoldProductsData);
        }

        // Check and set data for top-rated products
        if (topRatedProductsRes.ok) {
          const topRatedProductsData = await topRatedProductsRes.json();
          setTopRatedProducts(topRatedProductsData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchTrendingData();
  }, []);

  // Prepare data for the Pie Chart for most sold products
  const pieData = topSoldProducts.map((product) => ({
    name: product.orderName,
    value: parseInt(product.totalSold, 10),
  }));

  // Prepare data for the Bar Chart for top-rated products
  const topRatedData = topRatedProducts.map((product) => ({
    name: product._id,  // Assuming productModelName or _id is in the MongoDB result
    value: parseFloat(product.averageRating), // Assuming the API returns average rating as "averageRating"
  }));

  return (
    <div>
      <h2>Top Products by Zip Code</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topZips}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="store_location" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalOrders" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Top 5 Most Sold Products</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <PieTooltip />
        </PieChart>
      </ResponsiveContainer>

      <h2>Top 5 Rated Products</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topRatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} /> {/* Assuming ratings are out of 5 */}
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Trending;