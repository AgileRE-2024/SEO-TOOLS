import React from "react";

const CircularProgress = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        {/* Outer Circle */}
        <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        {/* Inner Circle (Optional, for visual effect) */}
        <div className="absolute w-12 h-12 border-4 border-transparent border-t-blue-300 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default CircularProgress;
