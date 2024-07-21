import React from "react";

export default function Button({ children }) {
  return (
    <div>
      <button
        type="subimt"
        className="bg-indigo-700 px-3  hover:bg-indigo-500 text-gray-400 py-2 rounded-sm"
      >
        {children}
      </button>
    </div>
  );
}
