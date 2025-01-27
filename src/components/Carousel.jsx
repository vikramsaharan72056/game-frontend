const Carousel = ({ items, containerId, scrollFunction, renderItem }) => (
  <div className="relative overflow-hidden ">
    <div className="absolute top-3 transform -translate-y-1/2 right-0 flex gap-0 z-10 py-10">
      <button
        className="bg-gray-800 text-white text-xl px-2 py-1 rounded-full hover:bg-gray-700"
        onClick={() => scrollFunction("left")}
      >
        ‹
      </button>
      <button
        className="bg-gray-800 text-white text-xl px-2 py-1 rounded-full hover:bg-gray-700"
        onClick={() => scrollFunction("right")}
      >
        ›
      </button>
    </div>
    <div className="flex overflow-x-hidden gap-4 no-scrollbar" id={containerId} style={{ scrollBehavior: 'smooth' }}>
      {items.map((item, index) => renderItem(item, index))}
    </div>

  </div>
);

export default Carousel;