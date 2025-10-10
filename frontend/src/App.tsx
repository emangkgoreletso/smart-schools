import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";

// Pages
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import StudentCenter from "./Pages/StudentCenter";
import ParentsPortal from "./Pages/ParentsPortal";
import TeachersPortal from "./Pages/TeachersPortal";
import AssignmentsPage from "./Pages/AssignmentsPage";
import SubmissionsPage from "./Pages/SubmissionsPage";
import TestsPage from "./Pages/TestsPage";
import AdmissionPage from "./Pages/Admission";
import PaymentPage from "./Pages/Payments";
import ReportsPage from "./Pages/Reports";

// Auth utility
import { isAuthenticated } from "./utils/auth";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* Navbar always visible except on auth pages */}
        {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
          <NavBar />
        )}

        <main className="flex-1 p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/student"
              element={isAuthenticated() ? <StudentCenter /> : <Navigate to="/login" />}
            />
            <Route
              path="/teachers"
              element={isAuthenticated() ? <TeachersPortal /> : <Navigate to="/login" />}
            />
            <Route
              path="/parents"
              element={isAuthenticated() ? <ParentsPortal /> : <Navigate to="/login" />}
            />

            {/* Academic Modules */}
            <Route
              path="/assignments"
              element={isAuthenticated() ? <AssignmentsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/submissions"
              element={isAuthenticated() ? <SubmissionsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/tests"
              element={isAuthenticated() ? <TestsPage /> : <Navigate to="/login" />}
            />

            {/* Administrative Modules */}
            <Route
              path="/admissions"
              element={isAuthenticated() ? <AdmissionPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/payments"
              element={isAuthenticated() ? <PaymentPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/reports"
              element={isAuthenticated() ? <ReportsPage /> : <Navigate to="/login" />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
