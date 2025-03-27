import React from "react";

const Loader = () => {
  return (
    <div className=" w-full h-full flex items-center justify-center text-white spin-loader">
      <svg viewBox="25 25 50 50">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#4A8805", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#1F4010", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loader;
