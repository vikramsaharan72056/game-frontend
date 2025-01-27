import React, { useState } from "react";
import Users from "./Users";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import Games from "./Games";
import "./UserDashboard.css";
import AdminHome from "./AdminHome";
import WithdrawalApproval from "./WithdrawApproval";
import SliderManager from "./SlideManager";
import AdminBankAccountslist from "./AdminBankAccountslist";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [hoverSidebarElement, setHoverSidebarElement] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile responsiveness

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "users":
        return <Users />;
      case "settings":
        return <div>Settings Page</div>;
      case "reports":
        return <div>Reports Page</div>;
      case "games":
        return <Games />;
      case "withdrawapproval":
        return <WithdrawalApproval />;
      case "sliders":
        return <SliderManager />;
      case "bankAccounts":
        return <AdminBankAccountslist />;
      default:
        return <AdminHome activeComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-screen w-[65%] sm:w-[16%] text-white z-20 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-900`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 bg-red-600 text-white p-1 rounded text-xs sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✖
        </button>
        <h2 className="text-lg font-bold py-4 px-2 my-2 mx-4 bg-gray-700 rounded-lg shadow-md">
          Admin Dashboard
        </h2>
        <nav className="flex-1">
          <ul className="flex flex-col rounded-lg shadow-md p-2 mx-4 my-0 bg-gray-700">
            <li>
              <button
                onClick={() => setActiveComponent("dashboard")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "Dashboard"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("Dashboard")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("users")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "users"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("users")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("bankAccounts")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "bankAccounts"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("bankAccounts")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Bank Accounts
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("withdrawapproval")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "withdrawapproval"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("withdrawapproval")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Withdraws
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("reports")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "reports"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("reports")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Reports
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("sliders")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "sliders"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("sliders")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Slider
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("games")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "games"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("games")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Games
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("settings")}
                className={`w-full text-center py-3 px-6 ${
                  hoverSidebarElement === "settings"
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onMouseEnter={() => setHoverSidebarElement("settings")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sidebar Open Button for Mobile */}
      {!isSidebarOpen && (
        <button
          className="absolute top-16 left-0 bg-green-700 text-white p-1 rounded-r-md text-sm sm:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Main Content */}
      <main
        className="ml-0 sm:ml-[16%] text-black p-6 overflow-y-auto no-scrollbar bg-white flex-1"
      >
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
