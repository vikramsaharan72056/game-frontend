import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { GET_ALL_GAMES } from "../../constants/apiEndpoints";

const GamesComponent = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(GET_ALL_GAMES);
      setGames(response.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  const filteredGames = games.filter((game) => game.type !== "Sport");

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 min-h-screen flex flex-col mb-20">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">Trending Games</h2>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentGames.map((game, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                game.image.startsWith("./")
                  ? game.image
                  : `${BASE_URL}/uploads/${game.image}`
              }
              alt={game.name}
              className="w-full h-40 object-contain bg-gray-900"
              loading="lazy"
            />
            <div className="p-4 text-center text-white">
              <p className="font-bold mb-2 text-lg">{game.name}</p>
              <p className="text-gray-400">{game.playing || 999} playing</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-blue-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 mx-1 rounded-full border ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 border-gray-500"
            } hover:bg-blue-400 transition`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-blue-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GamesComponent;
