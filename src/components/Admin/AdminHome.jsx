import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_USERS, GET_ALL_GAMES } from "../../constants/apiEndpoints";

import Users from "./Users";

const AdminHome = ({ activeComponent }) => {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(GET_ALL_USERS);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGames = async () => {
      try {
        const response = await axios.get(GET_ALL_GAMES);
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchGames();
  }, []);

  return (
    <div className="p-4">
      {/* Card Container */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        {/* Users Card */}
        <div className="bg-gray-800 flex-1 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mt-2">
            <div>
              <h3 className="text-white text-lg font-semibold">Users</h3>
              <p className="text-gray-400 text-sm mt-1">Ready to manage users?</p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                onClick={() => activeComponent("users")}
              >
                Users
              </button>
            </div>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-600"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="15"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-blue-500"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="15"
                  cx="18"
                  cy="18"
                  style={{ strokeDasharray: "95", strokeDashoffset: "2" }} // Adjust progress dynamically
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                {users.length}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <i className="text-white">ℹ️</i> Not entered yet
            </span>
          </div>
        </div>

        {/* Games Card */}
        <div className="bg-gray-800 flex-1 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mt-2">
            <div>
              <h3 className="text-white text-lg font-semibold">Games</h3>
              <p className="text-gray-400 text-sm mt-1">Ready to manage games?</p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                onClick={() => activeComponent("games")}
              >
                Games
              </button>
            </div>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-600"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="15"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-blue-500"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="15"
                  cx="18"
                  cy="18"
                  style={{ strokeDasharray: "94", strokeDashoffset: "50" }} // Adjust progress dynamically
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                {games.length}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "0%" }} // Adjust dynamically
              ></div>
            </div>
            <p className="text-gray-400 text-right text-sm mt-1">0%</p>
          </div>
        </div>
      </div>

      {/* Responsive Section */}
      <div className="mt-8">
        {/* Show Users component only when "users" is active */}
         <Users />
      </div>
    </div>
  );
};

export default AdminHome;
