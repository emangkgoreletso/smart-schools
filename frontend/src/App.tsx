import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import StudentCentre from "./Pages/StudentCentre";
import TeachersPortal from "./Pages/TeachersPortal";
import ParentsPortal from "./Pages/ParentsPortal";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Payments from "./pages/Payments";
import Admission from "./Pages/Admissions";
import Reports from "./Pages/Reports";
import Assignments from "./Pages/Assignments";
import SubmissionsPage from "./Pages/SubmissionsPage";
import TestsPage from "./Pages/TestsPage";


const App: React.FC = () => {
  return (
        
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/student-centre" element={<StudentCentre />} />
        <Route path="/teachers-portal" element={<TeachersPortal />} />
        <Route path="/parents-portal" element={<ParentsPortal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/tests" element={<TestsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

