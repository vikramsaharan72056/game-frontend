 import React, { useState } from 'react';
 import { Link,useNavigate } from 'react-router-dom';
 import Users from './Admin/Users';
 const Sidebar = ({type}) => {

    const [activeComponent, setActiveComponent] = useState('dashboard');
    const navigate = useNavigate
  
    // Function to render the active component
    const renderComponent = () => {
      switch (activeComponent) {
        case 'users':
          return <Users />;
        case 'settings':
          return <div>Settings Page</div>;
        case 'reports':
          return <div>Reports Page</div>;
        case 'games':
          return <div>Games Page</div>;
        default:
          return <div>Welcome to the Admin Dashboard</div>;
      }
    };

   return (
    
    <aside className="w-64  text-white flex flex-col" style={{backgroundColor: "rgba(21,49,32,255)"}}>
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
   )
}

export default Sidebar;