import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Cities from "./Components/Pages/Cities/Cities";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
      </Routes>
    </Router>
  );
}

export default App;
