import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios.post('http://localhost:3001/login', { email, password })
    // .then((response) => {

    //   console.log(response)
    //   const userId = response.data.id;  // Get userId from the response
    //   const userRole = response.data.role;  // Get userRole from the response

    //   // Store the userId and userRole in localStorage
    //   localStorage.setItem('userId', userId);  // Save userId in localStorage
    //   localStorage.setItem('userRole', userRole);  // Save userRole in localStorage

    //   // Redirect based on role
    //   if (userRole === 'storeManager') {
    //     navigate('/store-manager');
    //   } else if (userRole === 'salesman') {
    //     navigate('/salesman');
    //   } else {
    //     navigate('/customer');
    //   }
    // })
    // .catch((error) => {
    //   alert('Login failed');
    //   console.error('Login error:', error);
    // });


      // Send login data to the backend
  axios.post('http://localhost:3001/login', { email, password })
  .then((response) => {
    console.log(response)
    // Ensure response has a role
    if (response.status === 200 && response.data.role) {
      const userRole = response.data.role;
      const userEmail = response.data.email;
      const userName = response.data.name;
      console.log(response)

      // Store user id and role in localStorage (if id is needed later)
      localStorage.setItem('userId', response.data.id);  // Store 'id' if needed
      localStorage.setItem('userRole', userRole);  // Store the role in localStorage
      localStorage.setItem('userEmail', userEmail);  // Store email
      localStorage.setItem('userName', userName);

      // Redirect based on role
      if (userRole === 'storeManager') {
        navigate('/store-manager');
      } else if (userRole === 'salesman') {
        navigate('/salesman');
      } else {
        navigate('/customer');
      }
    } else {
      alert('Login failed: Missing role');
    }
  })
  .catch((error) => {
    alert('Login failed');
    console.error(error);
  });

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title"></h3>
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Select Role</label>
                  <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="customer">Customer</option>
                    <option value="salesman">Salesman</option>
                    <option value="storeManager">Store Manager</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/signup">Sign up here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
