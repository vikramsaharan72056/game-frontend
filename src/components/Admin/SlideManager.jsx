import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { GET_ALL_SLIDERS, ADD_SLIDER, UPDATE_SLIDER, DELETE_SLIDER } from "../../constants/apiEndpoints";

const SliderManager = () => {
  const [sliders, setSliders] = useState([]);
  const [newSlider, setNewSlider] = useState({ title: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [editingSlider, setEditingSlider] = useState({ title: "", image: null });
  const [message, setMessage] = useState({ message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const slidersPerPage = 5; // Number of sliders per page

  const fetchSliders = async () => {
    try {
      const response = await axios.get(GET_ALL_SLIDERS);
      setSliders(response.data);
      setMessage({ message: "All sliders fetched successfully", type: "Success" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setMessage({ message: "Error fetching sliders", type: "Error" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
    }
  };

  const createSlider = async () => {
    if (!newSlider.title || !newSlider.image) {
      alert("Please provide both title and image.");
      return;
    }
    const formData = new FormData();
    formData.append("title", newSlider.title);
    formData.append("image", newSlider.image);

    try {
      await axios.post(ADD_SLIDER, formData);
      setMessage({ message: "Slider created successfully", type: "Success" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
      setNewSlider({ title: "", image: null });
      fetchSliders();
    } catch (error) {
      console.error("Error creating slider:", error);
      setMessage({ message: "Error creating slider", type: "Error" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
    }
  };

  const updateSlider = async (id) => {
    const formData = new FormData();
    formData.append("title", editingSlider.title);
    if (editingSlider.image) formData.append("image", editingSlider.image);

    try {
      await axios.put(UPDATE_SLIDER(id), formData);
      setMessage({ message: "Slider updated successfully", type: "Success" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
      setEditingId(null);
      setEditingSlider({ title: "", image: null });
      fetchSliders();
    } catch (error) {
      console.error("Error updating slider:", error);
      setMessage({ message: "Error updating slider", type: "Error" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
    }
  };

  const deleteSlider = async (id) => {
    try {
      await axios.delete(DELETE_SLIDER(id));
      setMessage({ message: "Slider deleted successfully", type: "Success" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
      fetchSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
      setMessage({ message: "Error deleting slider", type: "Error" });
      setTimeout(() => setMessage({ message: "", type: "" }), 3000);
    }
  };

  const handleNewImageUpload = (e) => setNewSlider({ ...newSlider, image: e.target.files[0] });
  const handleEditImageUpload = (e) => setEditingSlider({ ...editingSlider, image: e.target.files[0] });

  const resetEditing = () => {
    setEditingId(null);
    setEditingSlider({ title: "", image: null });
  };

  const totalPages = Math.ceil(sliders.length / slidersPerPage);
  const currentSliders = sliders.slice((currentPage - 1) * slidersPerPage, currentPage * slidersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow">
      <h1
        className={`text-md font-bold mb-4 text-center ${
          message.type === "Success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {message.message}
      </h1>

      <h1 className="text-2xl font-bold text-center mb-6">Slider Manager</h1>

      {/* Create New Slider */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Slider</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Title"
            value={newSlider.title}
            onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })}
            className="border border-gray-300 rounded-md p-2 flex-grow"
          />
          <input
            type="file"
            onChange={handleNewImageUpload}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={createSlider}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* List of Sliders */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Slider List</h2>

        {/* Table for Larger Screens */}
        <div className="hidden lg:block overflow-x-auto">
          {currentSliders.length === 0 ? (
            <p>No sliders found.</p>
          ) : (
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSliders.map((slider, index) => (
                  <tr key={slider.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {(currentPage - 1) * slidersPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={`${BASE_URL}/uploads/${slider.image}`}
                        alt={slider.title}
                        className="w-16 h-16 object-cover rounded-md"
                        loading="lazy"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingId === slider.id ? (
                        <input
                          type="text"
                          value={editingSlider.title}
                          onChange={(e) =>
                            setEditingSlider({ ...editingSlider, title: e.target.value })
                          }
                          className="border border-gray-300 rounded-md p-2"
                        />
                      ) : (
                        slider.title
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      {editingId === slider.id ? (
                        <>
                          <input
                            type="file"
                            onChange={handleEditImageUpload}
                            className="border border-gray-300 rounded-md p-2"
                          />
                          <button
                            onClick={() => updateSlider(slider.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={resetEditing}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(slider.id);
                              setEditingSlider(slider);
                            }}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteSlider(slider.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Cards for Smaller Screens */}
        <div className="block lg:hidden">
          {currentSliders.length === 0 ? (
            <p>No sliders found.</p>
          ) : (
            currentSliders.map((slider, index) => (
              <div key={slider.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="mb-2">
                  <strong>#{(currentPage - 1) * slidersPerPage + index + 1}</strong>
                </div>
                <div className="mb-2">
                  <img
                    src={`${BASE_URL}/uploads/${slider.image}`}
                    alt={slider.title}
                    className="w-full h-32 object-cover rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="mb-2">
                  <strong>Title:</strong>{" "}
                  {editingId === slider.id ? (
                    <input
                      type="text"
                      value={editingSlider.title}
                      onChange={(e) =>
                        setEditingSlider({ ...editingSlider, title: e.target.value })
                      }
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  ) : (
                    slider.title
                  )}
                </div>
                <div className="flex gap-2">
                  {editingId === slider.id ? (
                    <>
                      <input
                        type="file"
                        onChange={handleEditImageUpload}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                      <button
                        onClick={() => updateSlider(slider.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={resetEditing}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(slider.id);
                          setEditingSlider(slider);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSlider(slider.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
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

export default SliderManager;
