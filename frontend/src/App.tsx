import React from "react";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const Home: React.FC = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold text-maroon-700">🏫 Smart Schools</h1>
    <p className="mt-4">Welcome to the rebuilt frontend!</p>
    <Link
      to="/about"
      className="mt-6 inline-block bg-maroon-700 text-white px-4 py-2 rounded-lg"
    >
      Go to About
    </Link>
  </div>
);

const About: React.FC = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold">About Page</h1>
    <p>This is a working route in the new frontend.</p>
  </div>
);

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

export default App;
