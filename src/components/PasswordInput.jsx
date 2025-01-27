import React, { useState } from 'react';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.646a10.477 10.477 0 0116.042 0M21 12c0 .791-.086 1.563-.252 2.3a10.478 10.478 0 01-3.366 5.674M12 15l-1.5 1.5m3-3L15 12m-3-3l-1.5-1.5m3 3l1.5 1.5m-6 6l1.5-1.5m3-3L9 12m6 0L9 6M6.818 6.818a10.477 10.477 0 010 10.364"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12c0-1.66-.673-3.164-1.76-4.24M3 21l18-18M3 3l18 18M9.879 9.879a3 3 0 104.242 4.242M15 12c0 1.66.673 3.164 1.76 4.24m-6.128 2.648A10.455 10.455 0 0121 12c0-.791-.086-1.563-.252-2.3"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
