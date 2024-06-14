import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
