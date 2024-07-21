import React from "react";

export default function Ribon({ children }) {
  return (
    <div className="bg-slate-300 py-2 px-2">
      <h1>{children}</h1>
    </div>
  );
}
