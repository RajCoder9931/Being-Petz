import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center py-6">
      <div
        className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"
        style={{ background: "transparent" }}
      ></div>
    </div>
  );
};

export default Loader;
