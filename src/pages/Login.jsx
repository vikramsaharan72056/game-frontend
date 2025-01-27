import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { USER_LOGIN } from '../constants/apiEndpoints';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(USER_LOGIN, { email, password });
      const { token, user, wallet } = response.data;

      const twoHoursInMs = 2 * 60 * 60 * 1000; // Two hours in milliseconds
      setWithExpiry('usertoken', token, twoHoursInMs);
      sessionStorage.setItem('username', user.username);
      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('fundingWallet', user.fundingWallet);
      sessionStorage.setItem('supportWallet', user.supportWallet);
      sessionStorage.setItem('userId', user.id);
      sessionStorage.setItem('wallet', JSON.stringify(wallet));

      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(21,49,32,255)',
        backgroundImage: 'none', // Ensure no heavy background images
      }}
    >
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Using h1 for main heading to prioritize LCP */}
        <h1 className="text-2xl font-bold text-center mb-6">User Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
