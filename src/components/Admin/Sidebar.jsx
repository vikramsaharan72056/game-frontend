// Sidebar.jsx
import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <aside className="w-64 text-white flex flex-col" style={{ backgroundColor: "rgba(21,49,32,255)" }}>
      <h2 className="text-xl font-bold py-4 px-6 bg-black">Admin Dashboard</h2>
      <nav className="flex-1">
        <ul>
          <li>
            <button
              onClick={() => setActiveComponent('users')}
              className="w-full text-left py-3 px-6 hover:bg-gray-700"
            >
              Users
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('settings')}
              className="w-full text-left py-3 px-6 hover:bg-gray-700"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('reports')}
              className="w-full text-left py-3 px-6 hover:bg-gray-700"
            >
              Reports
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('games')}
              className="w-full text-left py-3 px-6 hover:bg-gray-700"
            >
              Games
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('dashboard')}
              className="w-full text-left py-3 px-6 hover:bg-gray-700"
            >
              Dashboard
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
