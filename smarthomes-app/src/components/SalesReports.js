import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const SalesReport = () => {
    const [soldProducts, setSoldProducts] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [dailySales, setDailySales] = useState([]);

    useEffect(() => {
        // Fetch all sold products with sales data
        axios.get('http://localhost:3001/sales-report/products-sold')
            .then(response => {
                setSoldProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching sold products:', error);
            });

        // Fetch data for Bar Chart (product name and total sales)
        axios.get('http://localhost:3001/sales-report/products-sales-chart')
            .then(response => {
                setBarChartData(response.data);
            })
            .catch(error => {
                console.error('Error fetching sales chart data:', error);
            });

        // Fetch daily sales transactions
        axios.get('http://localhost:3001/sales-report/daily-sales')
            .then(response => {
                setDailySales(response.data);
            })
            .catch(error => {
                console.error('Error fetching daily sales:', error);
            });
    }, []);

    // Function to get maximum total_sales for dynamic Y-axis scaling
    const getMaxTotalSales = () => {
        if (barChartData.length === 0) return 0;
        return Math.max(...barChartData.map(item => item.total_sales)) + 500; // Add a buffer for better scaling
    };

    return (
        <div className="container mt-4">
            <h1>Sales Report</h1>

            {/* Table of all products sold */}
            <h2>Products Sold</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price ($)</th>
                        <th>Number of Items Sold</th>
                        <th>Total Sales ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {soldProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.items_sold}</td>
                            <td>{product.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bar Chart for products and total sales */}
            <h2>Product Sales Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, getMaxTotalSales()]} /> {/* Dynamic Y-axis */}
                    <Tooltip />
                    <Bar dataKey="total_sales" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            {/* Table of daily sales transactions */}
            <h2>Daily Sales Transactions</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Sales ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {dailySales.map(sale => (
                        <tr key={sale.date}>
                            <td>{new Date(sale.date).toLocaleDateString()}</td>
                            <td>{sale.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;