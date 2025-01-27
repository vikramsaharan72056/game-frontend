import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../components/User/UserDashboard";
import BankAccountManager from "../components/User/BankAccountManager";
import UserSettings from "../components/User/UserSettings";
import KYCManager from "../components/User/KYCManager";
import GamesComponent from "../components/User/GamesComponent";
import "../components/User/UserDashboard.css";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfileItem, setSelectedProfileItem] = useState(null);
  const [hoverSidebarElement, setHoverSidebarElement] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar visibility for small screens

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <UserDashboard />;
      case "games":
        switch (selectedGame) {
          case "gameTypeA":
            return <div>Game Type A Content</div>;
          case "gameTypeB":
            return <GamesComponent />;
          default:
            return <div>Select a game to view details.</div>;
        }
      case "profile":
        switch (selectedProfileItem) {
          case "profileTypeA":
            return <KYCManager />;
          case "profileTypeB":
            return <BankAccountManager />;
          case "profileTypeC":
            return <UserSettings />;
          default:
            return <div>Select a profile item to view details.</div>;
        }
      case "settings":
        return <div>Settings Page</div>;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: "rgba(21, 49, 32, 255)" }}>
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-screen w-[65%] sm:w-[15%] text-white z-20 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        style={{ backgroundColor: "rgba(41, 69, 52, 255)" }}
      >
        {/* Sidebar Close Button (for small screens only) */}
        <button
          className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded text-xs sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          ☰
        </button>
        <h2
          className="text-lg font-bold py-4 px-6 mb-2"
          style={{ backgroundColor: "rgba(51, 79, 62, 255)" }}
        >
          User Dashboard
        </h2>
        <nav className="flex-1 overflow-y-auto">
          <ul
            className="flex flex-col rounded-lg shadow-md p-2 mx-4 my-0"
            style={{ backgroundColor: "rgba(51, 79, 62, 255)" }}
          >
            <li>
              <button
                onClick={() => setActiveComponent("dashboard")}
                className="w-full text-left py-3 px-6 rounded hover:bg-green-700"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "Dashboard"
                      ? "rgba(61, 89, 72, 255)"
                      : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Dashboard")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsGamesOpen((prev) => !prev)}
                className="w-full text-left py-3 px-6 flex justify-between items-center rounded hover:bg-green-700"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "Games"
                      ? "rgba(61, 89, 72, 255)"
                      : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Games")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Games {isGamesOpen ? "▾" : "▸"}
              </button>
              {isGamesOpen && (
                <ul className="pl-4 space-y-1">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedGame("gameTypeA");
                        setActiveComponent("games");
                      }}
                      className="block w-full text-left py-2 px-4 rounded hover:bg-green-600"
                    >
                      Color Games
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedGame("gameTypeB");
                        setActiveComponent("games");
                      }}
                      className="block w-full text-left py-2 px-4 rounded hover:bg-green-600"
                    >
                      Normal Games
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="w-full text-left py-3 px-6 flex justify-between items-center rounded hover:bg-green-700"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "Profile"
                      ? "rgba(61, 89, 72, 255)"
                      : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Profile")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Profile {isProfileOpen ? "▾" : "▸"}
              </button>
              {isProfileOpen && (
                <ul className="pl-4 space-y-1">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedProfileItem("profileTypeA");
                        setActiveComponent("profile");
                      }}
                      className="block w-full text-left py-2 px-4 rounded hover:bg-green-600"
                    >
                      KYC
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedProfileItem("profileTypeB");
                        setActiveComponent("profile");
                      }}
                      className="block w-full text-left py-2 px-4 rounded hover:bg-green-600"
                    >
                      Bank Account
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedProfileItem("profileTypeC");
                        setActiveComponent("profile");
                      }}
                      className="block w-full text-left py-2 px-4 rounded hover:bg-green-600"
                    >
                      Settings
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sidebar Open Button (for small screens only) */}
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
        className="flex-1 ml-0 sm:ml-[15%] p-4 overflow-y-auto"
        style={{ backgroundColor: "rgba(21,49,32,255)" }}
      >
        {renderComponent()}
      </main>
    </div>
  );
};

export default Homepage;
