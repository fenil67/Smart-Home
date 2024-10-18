import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import StoreManager from './components/StoreManager';
import Salesman from './components/Salesman';
import CustomerDashboard from './components/CustomerDashboard';
import SmartDoorbells from './components/SmartDoorbells';
import SmartDoorlocks from './components/SmartDoorlocks';
import SmartSpeakers from './components/SmartSpeakers';
import SmartLightings from './components/SmartLightings';
import SmartThermostats from './components/SmartThermostats';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetail';
import ReviewForm from './components/ReviewForm';
import Trending from './components/Trending';
import 'bootstrap/dist/css/bootstrap.min.css';
import PastOrders from './components/PastOrders';
import './App.css';
import Inventory from './components/Inventory';
import SalesReports from './components/SalesReports';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };



  const handleCheckout = (customerInfo) => {
    console.log('Order placed:', customerInfo);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <div className="home-container">
            <div className="overlay">
              <div className="text-center home-content">
                <h1 className="home-title">Welcome to SmartHomes</h1>
                <p className="home-subtitle">Your one-stop shop for smart home products</p>
                <a className="btn btn-primary btn-lg mt-4" href="/login" role="button">Shop Now</a>
              </div>
            </div>
          </div>}
        />
        {/* Login and Signup */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Role-based Routes */}
        <Route path="/store-manager" element={<StoreManager />} />
        <Route path="/salesman" element={<Salesman />} />
        <Route path="/customer" element={<CustomerDashboard />} />

        {/* Cart and Checkout */}
        <Route path="/products/doorbells" element={<SmartDoorbells addToCart={addToCart} />} />
        <Route path="/products/doorlocks" element={<SmartDoorlocks addToCart={addToCart} />} />
        <Route path="/products/lightings" element={<SmartLightings addToCart={addToCart} />} />
        <Route path="/products/speakers" element={<SmartSpeakers addToCart={addToCart} />} />
        <Route path="/products/thermostats" element={<SmartThermostats addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/storemanager" element={<StoreManager />} />
        <Route path="/salesman" element={<Salesman />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/write-review/:id" element={<ReviewForm />} />
        <Route path="/trending" element={<Trending />} /> {/* Trending Page Route */}

        <Route path="/past-orders" element={<PastOrders />} />

        <Route path="/products/doorbells" element={<SmartDoorbells />} />
        <Route path="/products/doorlocks" element={<SmartDoorlocks />} />
        <Route path="/products/speakers" element={<SmartSpeakers />} />
        <Route path="/products/lightings" element={<SmartLightings />} />
        <Route path="/products/thermostats" element={<SmartThermostats />} />

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales-reports" element={<SalesReports />} />
      </Routes>
    </Router>
  );
};

export default App;