import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_USER_BY_ID, UPDATE_USER, UPDATE_USER_PASSWORD } from "../../constants/apiEndpoints";

const UserSettings = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.get(GET_USER_BY_ID(userId));
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        setMessage("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const userId = sessionStorage.getItem("userId");

      // Update user details
      await axios.put(UPDATE_USER(userId), user);

      if (passwordData.newPassword && passwordData.confirmPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          setMessage("New password and confirm password do not match.");
          setIsSaving(false);
          return;
        }

        await axios.put(UPDATE_USER_PASSWORD(userId), {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        });
      }

      setMessage("User updated successfully!");
      setTimeout(() => setMessage(""), 3000);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating user", error);
      setMessage("Failed to update user details or password.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          User Settings
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {isLoading ? (
          <p className="text-center text-green-600">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Details */}
            <div>
              <label className="block text-sm font-medium text-green-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={user.dob.split("T")[0]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Password Section */}
            <div>
              <label className="block text-sm font-medium text-green-700">
                Current Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                Confirm New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPasswords"
                checked={showPasswords}
                onChange={togglePasswordVisibility}
                className="mr-2"
              />
              <label
                htmlFor="showPasswords"
                className="text-sm font-medium text-green-700"
              >
                Show Passwords
              </label>
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
                isSaving ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
