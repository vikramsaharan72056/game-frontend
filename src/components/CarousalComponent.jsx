import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants/config";

const CarouselComponent = ({ dynamicCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === dynamicCards.length - 1 ? 0 : currentIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? dynamicCards.length - 1 : currentIndex - 1
    );
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      goToNext();
    }, 3000); // Auto-scroll every second

    return () => clearInterval(autoScroll); // Cleanup
  }, [currentIndex]);

  return (
    <div className="relative w-full h-80 max-w-4xl mx-2  overflow-hidden rounded-lg shadow-lg">
      {/* Carousel Inner */}
      <div
        className="absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {dynamicCards.map((card, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-full relative"
            style={{ flexBasis: "100%" }}
          >
            <img
              src={`${BASE_URL}/uploads/${card.image}`}
              alt={card.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
              <h3 className="text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-lg">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <ol className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {dynamicCards.map((_, index) => (
          <li
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></li>
        ))}
      </ol>

      {/* Left Navigation */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 focus:outline-none"
      >
        ‹
      </button>

      {/* Right Navigation */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 focus:outline-none"
      >
        ›
      </button>
    </div>
  );
};

export default CarouselComponent;
