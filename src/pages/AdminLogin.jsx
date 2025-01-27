import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { ADMIN_LOGIN } from '../constants/apiEndpoints';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
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
  
  const getWithExpiry = (key) => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(ADMIN_LOGIN, {
        username,
        password,
      });
      const twoHoursInMs = 2 * 60 * 60 * 1000; // Two hours in milliseconds

    setWithExpiry('admintoken', response.data.token, twoHoursInMs);
      alert('Admin login successful!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `rgba(21, 49, 32, 255)` }}>
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition mt-4"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default AdminLogin;
