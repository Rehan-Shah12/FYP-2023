import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
