import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { BASE_URL } from "../../constants/config";
import { GET_ALL_GAMES, GET_ALL_SLIDERS } from "../../constants/apiEndpoints";
import CarouselComponent from "../CarousalComponent";

const UserDashboard = () => {
  const user = sessionStorage.getItem("username") || "VikramSah291";
  const [games, setGames] = useState([]);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesResponse, slidersResponse] = await Promise.all([
          axios.get(GET_ALL_GAMES),
          axios.get(GET_ALL_SLIDERS),
        ]);
        setGames(gamesResponse.data);
        setSliders(slidersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    const scrollAmount = container.offsetWidth; // Scroll by one view at a time

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Main Content */}
      <main className="container ml-[0%] p-4 w-[100%]">
        {/* VIP Progress and Carousel */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6 mt-4">
          {/* VIP Progress Card */}
          <div className="relative w-full h-80 bg-gray-800 rounded-lg p-4   max-w-md flex flex-col justify-between ">
            <h3 className="text-lg lg:text-xl font-semibold mb-2">Your VIP Progress</h3>
            <p className="text-sm text-gray-400">{user}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">0.00%</p>
                <span className="text-gray-500">ⓘ</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500">None</p>
              <p className="text-yellow-500">★ Bronze</p>
            </div>
          </div>

          {/* Carousel */}
          <CarouselComponent dynamicCards={sliders} />
        </div>

        {/* Trending Games Section */}
        <section className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-semibold">Trending Games</h2>
            <div className="flex space-x-2">
              <button
                className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
                onClick={() => scrollContainer("gamesContainer", "left")}
              >
                ‹
              </button>
              <button
                className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
                onClick={() => scrollContainer("gamesContainer", "right")}
              >
                ›
              </button>
            </div>
          </div>

          <div
            className="flex overflow-x-auto space-x-4 no-scrollbar mt-4"
            id="gamesContainer"
          >
            {games
              .filter(
                (game) =>
                  game.type === "Casino" &&
                  (game.popularity === "Very Popular" || game.popularity === "Popular")
              )
              .map((game, index) => (
                <div
                  key={index}
                  className="min-w-[200px] relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={
                      game.image.startsWith("./")
                        ? game.image
                        : `${BASE_URL}/uploads/${game.image}`
                    }
                    alt={game.name}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                    <p className="absolute top-2 left-2 bg-gray-800 w-8 h-6 flex items-center justify-center rounded-full">
                      {index + 1}
                    </p>
                    <p className="text-lg font-bold text-white">{game.name}</p>
                    <p className="text-center mt-2 text-sm">{game.playing || 999} playing</p>
                  </div>
                  
                </div>
              ))}
          </div>
        </section>

        {/* Trending Sports Section */}
        <section className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-semibold">Trending Sports</h2>
            <div className="flex space-x-2">
              <button
                className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
                onClick={() => scrollContainer("sportsContainer", "left")}
              >
                ‹
              </button>
              <button
                className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
                onClick={() => scrollContainer("sportsContainer", "right")}
              >
                ›
              </button>
            </div>
          </div>

          <div
            className="flex overflow-x-auto space-x-4 no-scrollbar mt-4"
            id="sportsContainer"
          >
            {games
              .filter((game) => game.type === "Sport")
              .map((sport, index) => (
                <div
                  key={index}
                  className="min-w-[200px] relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={`${BASE_URL}/uploads/${sport.image}`}
                    alt={sport.name}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                    <p className="absolute top-2 left-2 bg-gray-800 w-8 h-6 flex items-center justify-center rounded-full">
                      {index + 1}
                    </p>
                    <p className="text-lg font-bold text-white">{sport.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
