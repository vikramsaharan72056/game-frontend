import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { GET_ALL_GAMES, ADD_GAME, UPDATE_GAME, DELETE_GAME } from "../../constants/apiEndpoints";
import { FaEdit, FaTrash } from "react-icons/fa";

const Games = () => {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    popularity: "",
    description: "",
    image: null,
    type: "",
  });
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 10;

  const fetchGames = async () => {
    try {
      const response = await axios.get(GET_ALL_GAMES);
      setGames(response.data || []);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("popularity", formData.popularity);
    data.append("description", formData.description);
    data.append("type", formData.type);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editing) {
        await axios.put(`${UPDATE_GAME(formData.id)}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Game updated successfully");
      } else {
        await axios.post(ADD_GAME, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Game created successfully");
      }
      fetchGames();
      resetForm();
    } catch (error) {
      console.error("Error submitting game:", error);
    }
  };

  const handleEdit = (game) => {
    setFormData({
      id: game.id,
      name: game.name,
      popularity: game.popularity,
      description: game.description,
      image: game.image.startsWith("./") ? game.image : `${BASE_URL}/uploads/${game.image}`,
      type: game.type,
    });
    setEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        await axios.delete(DELETE_GAME(id));
        alert("Game deleted successfully");
        fetchGames();
      } catch (error) {
        console.error("Error deleting game:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      popularity: "",
      description: "",
      image: null,
      type: "",
    });
    setEditing(false);
    setShowForm(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const currentGames = games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage);
  const totalPages = Math.ceil(games.length / gamesPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-black text-center mb-6">Games Management</h1>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8 max-w-lg mx-auto relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={resetForm}
          >
            ✕
          </button>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Game Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Popularity</label>
            <input
              type="text"
              name="popularity"
              value={formData.popularity}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
              required
            >
              <option value="Casino">Casino</option>
              <option value="Sport">Sport</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Image</label>
            {editing && formData.image && typeof formData.image === "string" && (
              <div className="mb-2">
                <img src={formData.image} alt="Current game" className="w-12 h-12 object-cover rounded-lg" />
              </div>
            )}
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {editing ? "Update Game" : "Add Game"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {!showForm && (
        <div>
          {/* Table for Larger Screens */}
          <div className="hidden lg:block">
            <table className="table-auto w-full bg-gray-800 text-white border-collapse border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="border border-gray-700 px-4 py-2">Image</th>
                  <th className="border border-gray-700 px-4 py-2">Name</th>
                  <th className="border border-gray-700 px-4 py-2">Game Type</th>
                  <th className="border border-gray-700 px-4 py-2">Popularity</th>
                  <th className="border border-gray-700 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentGames.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-700">
                    <td className="border border-gray-700 px-4 py-2">
                      <img
                        src={game.image.startsWith("./") ? game.image : `${BASE_URL}/uploads/${game.image}`}
                        alt={game.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{game.name}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{game.type}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">{game.popularity}</td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => handleEdit(game)} className="text-blue-500 hover:text-blue-700">
                          <FaEdit size={20} />
                        </button>
                        <button onClick={() => handleDelete(game.id)} className="text-red-500 hover:text-red-700">
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for Smaller Screens */}
          <div className="block lg:hidden">
            {currentGames.map((game) => (
              <div key={game.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <img
                  src={game.image.startsWith("./") ? game.image : `${BASE_URL}/uploads/${game.image}`}
                  alt={game.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                  loading="lazy"
                />
                <div className="mb-2">
                  <strong>Name:</strong> {game.name}
                </div>
                <div className="mb-2">
                  <strong>Type:</strong> {game.type}
                </div>
                <div className="mb-2">
                  <strong>Popularity:</strong> {game.popularity}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(game)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Previous
        </button>
        <span className="mt-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Games;
