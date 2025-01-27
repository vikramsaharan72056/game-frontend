import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADD_USER_BY_ADMIN, DELETE_USER, GET_ALL_USERS, UPDATE_USER } from "../../constants/apiEndpoints";
import { BASE_URL } from "../../constants/config";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(GET_ALL_USERS);
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_USER(id));
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully.");
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleSave = async (id) => {
    try {
      const updatedUser = users.find((user) => user.id === id);
      console.log(updatedUser,"updatedUser");
      await axios.put(UPDATE_USER(id), updatedUser);
      alert("User updated successfully.");
      setEditingUser(null);
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const handleInputChange = (id, field, value) => {
    // Check if the field is 'kycstatus' and map its value
    const mappedValue =
      field === 'kycstatus'
        ? value === 'Approved'
          ? 1
          : value === 'Rejected'
          ? 2
          : value === 'Pending'
          ? 0
          : value // Retain original value for unhandled cases
        : value;
  
    // Update the users array
    setUsers(users.map((user) => 
      user.id === id ? { ...user, [field]: mappedValue } : user
    ));
  };
  

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post(ADD_USER_BY_ADMIN, newUser);
      setUsers([...users, { ...newUser, id: response.data.id }]);
      setShowForm(false);
      alert("User created successfully!");
    } catch (err) {
      alert("Failed to create user.");
    }
  };

  const kycOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Rejected", label: "Rejected" },
    { value: "Approved", label: "Approved" },
  ];

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-2 sm:p-4 lg:p-8 bg-white overflow-y-auto h-full">
      <div className="flex flex-wrap justify-between items-center mb-4 lg:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">User Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          {showForm ? "Cancel" : "Add New User"}
        </button>
      </div>

      {showForm && (
        <div className="flex justify-center mb-4 lg:mb-6">
          <form
            className="w-full max-w-sm lg:max-w-md bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-md"
            onSubmit={async (e) => {
              e.preventDefault();
              const newUser = {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                dob: e.target.dob.value,
                phone: e.target.phone.value,
                kycstatus: "Pending", // Default KYC Status
              };
              await handleAddUser(newUser);
            }}
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2 lg:mb-4 text-center">Add New User</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-1 sm:p-2 mb-3 sm:mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              name="username"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-1 sm:p-2 mb-3 sm:mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              name="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-1 sm:p-2 mb-3 sm:mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              name="password"
              required
            />
            <input
              type="date"
              className="w-full p-1 sm:p-2 mb-3 sm:mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              name="dob"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-1 sm:p-2 mb-3 sm:mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              name="phone"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-1 sm:py-2 rounded hover:bg-green-600 text-sm"
            >
              Add User
            </button>
          </form>
        </div>
      )}

      {users.length > 0 ? (
        <div>
          {/* Table for larger screens */}
          <div className="hidden lg:block">
            <table className="w-full bg-white rounded-lg shadow-md text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Aadhar</th>
                  <th className="px-3 py-2 text-left">PAN</th>
                  <th className="px-3 py-2 text-left">KYC Status</th>
                  <th className="px-3 py-2 text-left">DOB</th>
                  <th className="px-3 py-2 text-left">Phone</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map((user) => (
                  <tr key={user.id}>
                    {editingUser === user.id ? (
                      <>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={user.username}
                            onChange={(e) =>
                              handleInputChange(user.id, "username", e.target.value)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                              handleInputChange(user.id, "email", e.target.value)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-1 py-2">{user.aadhar}</td>
                        <td className="px-1 py-2">{user.pan}</td>
                        <td className="px-1 py-2">
                          <select
                            value={user.kycstatus}
                            onChange={(e) =>
                              handleInputChange(user.id, "kycstatus", e.target.value)
                            }
                            className="border rounded px-2 py-1 w-30"
                          >
                            {kycOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="date"
                            value={user.dob}
                            onChange={(e) =>
                              handleInputChange(user.id, "dob", e.target.value)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={user.phone}
                            onChange={(e) =>
                              handleInputChange(user.id, "phone", e.target.value)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-2 py-2 flex gap-2">
                          <button
                            onClick={() => handleSave(user.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <img
                            src={`${BASE_URL}/uploads/${user.aadhar}`}
                            alt="Aadhar"
                            className="w-6 h-6 rounded-full"
                            loading="lazy"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <img
                            src={`${BASE_URL}/uploads/${user.pan}`}
                            alt="PAN"
                            className="w-6 h-6 rounded-full"
                            loading="lazy"
                          />
                        </td>
                        <td className="px-4 py-2 w-40" >{user.kycstatus ===0 ?"Pending":"Approved"}</td>
                        <td className="px-4 py-2">{user.dob}</td>
                        <td className="px-4 py-2">{user.phone}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            onClick={() => setEditingUser(user.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for smaller screens */}
          <div className="block lg:hidden">
            {users.map((user) => (
              <div key={user.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                {editingUser === user.id ? (
                  <>
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) => handleInputChange(user.id, "username", e.target.value)}
                      className="w-full mb-2 border rounded px-2 py-1"
                    />
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange(user.id, "email", e.target.value)}
                      className="w-full mb-2 border rounded px-2 py-1"
                    />
                    <select
                      value={user.kycstatus ===0 ?"Pending":"Approved"}
                      onChange={(e) => handleInputChange(user.id, "kycstatus", e.target.value)}
                      className="w-full mb-2 border rounded px-2 py-1"
                    >
                      {kycOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={user.dob}
                      onChange={(e) => handleInputChange(user.id, "dob", e.target.value)}
                      className="w-full mb-2 border rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      value={user.phone}
                      onChange={(e) => handleInputChange(user.id, "phone", e.target.value)}
                      className="w-full mb-2 border rounded px-2 py-1"
                    />
                    <button
                      onClick={() => handleSave(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-xs ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-2">
                      <strong>Name:</strong> {user.username}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div className="mb-2">
                      <strong>KYC Status:</strong> {user.kycstatus ===0 ?"Pending":"Approved"}
                    </div>
                    <div className="mb-2">
                      <strong>DOB:</strong> {user.dob}
                    </div>
                    <div className="mb-2">
                      <strong>Phone:</strong> {user.phone}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => setEditingUser(user.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">No Users Available</div>
      )}
    </div>
  );
};

export default Users;
