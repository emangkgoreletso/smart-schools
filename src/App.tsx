// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import Layout from "./Layout/Layout";

import Dashboard from "./Pages/Dashboard";
import StudentCentre from "./Pages/StudentCentre";
import SubjectsPage from "./Pages/SubjectsPage";
import SubjectShell from "./Pages/SubjectShell";

import TeachersPortal from "./Pages/TeachersPortal";
import ParentsPortal from "./Pages/ParentsPortal";
import Payments from "./Pages/Payments";
import NoticeBoard from "./Components/NoticeBoard";

import { AuthProvider } from "./Auth/AuthProvider";
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

            {/* -------- STUDENT CENTRE -------- */}
            <Route path="/student-centre" element={<StudentCentre />} />

            {/* SUBJECT ROUTES (NEW) */}
            <Route
              path="/student-centre/subjects"
              element={<SubjectsPage />}
            />
            <Route
              path="/student-centre/subjects/:subjectId"
              element={<SubjectShell />}
            />

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
