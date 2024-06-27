import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NewPost from "./components/NewPost";

function App() {
  return (
    <div className="bg-neutral-800">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="new-post" element={<NewPost />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
