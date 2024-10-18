import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hasOrders, setHasOrders] = useState(false); // Track if the user has past orders
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  const [showPastOrders, setShowPastOrders] = useState(false);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/past-orders/${userId}`)
        .then(response => {
          if (response.data.length > 0) setShowPastOrders(true);
        })
        .catch(error => console.error('Error fetching past orders:', error));
    }
  }, [userId]);

  // Handle search input change and fetch suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      axios.get(`http://localhost:3001/autocomplete?q=${value}`)
        .then(response => setSuggestions(response.data))
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);  // Clear suggestions if the input is less than 2 characters
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    const productId = suggestion.id;
    navigate(`/products/${productId}`);  // Redirect to product detail page
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">SmartHomes</Link>
      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {/* Store Manager Links */}
          {userRole === 'storeManager' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/storemanager">Manage Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">Inventory</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sales-reports">Sales Reports</Link>
              </li>
            </>
          )}

          {userRole === 'salesman' && (
            <li className="nav-item">
              <Link className="nav-link" to="/salesman">Manage Customers</Link>
            </li>
          )}

          {/* Products Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Products
            </a>
            <ul className="dropdown-menu" aria-labelledby="productsDropdown">
              <li><Link className="dropdown-item" to="/products/doorbells">Smart Doorbells</Link></li>
              <li><Link className="dropdown-item" to="/products/doorlocks">Smart Doorlocks</Link></li>
              <li><Link className="dropdown-item" to="/products/speakers">Smart Speakers</Link></li>
              <li><Link className="dropdown-item" to="/products/lightings">Smart Lightings</Link></li>
              <li><Link className="dropdown-item" to="/products/thermostats">Smart Thermostats</Link></li>
            </ul>
          </li>

          {showPastOrders && (
            <li className="nav-item">
              <Link className="nav-link" to="/past-orders">Past Orders</Link>
            </li>
          )}

          {userRole && (
            <Link className="nav-link" to="/cart">Cart</Link>
          )}
          <li className="nav-item">
            <a className="nav-link" href="/trending">Trending</a>
          </li>

          {/* Search Auto-Complete */}
          <li className="nav-item">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              className="form-control"
              placeholder="Search products..."
            />
            {suggestions.length > 0 && (
              <ul className="list-group position-absolute">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

        </ul>

        <div className="ml-auto">
          {userRole ? (
            <div className="btn-group mr-2">
              <button type="button" className="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown">
                Profile ({userId}, {userName})
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn btn-outline-primary mr-2" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;