// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import Layout from "./Layout/Layout";

import Dashboard from "./Pages/Dashboard";
import StudentCentre from "./Pages/StudentCentre";
import TeachersPortal from "./Pages/TeachersPortal";
import ParentsPortal from "./Pages/ParentsPortal";
import Payments from "./Pages/Payments";
import NoticeBoard from "./Components/NoticeBoard";

import { AuthProvider } from "./Components/AuthContext";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
  {/* ------- AUTH PAGES (no layout) ------- */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<Register />} />

  {/* ------- PAGES WITH NAVBAR + SIDEBAR ------- */}
  <Route element={<Layout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />

    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/student-centre" element={<StudentCentre />} />
    <Route path="/teachers-portal" element={<TeachersPortal />} />
    <Route path="/parents-portal" element={<ParentsPortal />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/notice-board" element={<NoticeBoard />} />
  </Route>
</Routes>

      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
