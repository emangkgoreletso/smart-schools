import React, { useState } from "react";
import StudentDashboard from "./StudentDashboard";
import TestsPage from "./TestsPage";
import ReportsSection from "../Components/Student/ReportsSection";
import SubjectsPage from "./SubjectsPage";
import AssignmentsPage from "./Assignments";
import StudentDiscussions from "../Components/Student/StudentDiscussions";
import PerformanceView from "../Components/Student/PerformanceView";
import AttendanceView from "../Components/Student/AttendanceView";
import AcademicRecords from "./AcademicRecords";



type StudentSection =
  | "dashboard"
  | "subjects"
  | "assignments"
  | "tests"
  | "discussions"
  | "attendance"
  | "records";

const StudentCentre: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<StudentSection>("dashboard");

  const renderSection = () => {
  switch (activeSection) {
    case "dashboard":
      return <StudentDashboard />;

    case "subjects":
      return <SubjectsPage />;

    case "assignments":
      return <AssignmentsPage />;

    case "tests":
      return <TestsPage />;

    case "discussions":
      return <StudentDiscussions />;

       case "attendance":
      return <AttendanceView />;

    case "records":
      return < AcademicRecords />;

    default:
      return null;
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-maroon-700">
          Student Centre
        </h1>
        <p className="text-sm text-gray-600">
          All your learning activities in one place
        </p>
      </div>

      {/* INTERNAL NAV */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: "dashboard", label: "Dashboard" },
          { key: "subjects", label: "Subjects" },
          { key: "assignments", label: "Assignments" },
          { key: "tests", label: "Tests & Quizzes" },
          { key: "discussions", label: "Discussions" },
          { key: "attendance", label: "Attendance" },
          { key: "records", label: "Academic Records" },
          
        ].map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setActiveSection(item.key as StudentSection)
            }
            className={`px-4 py-2 rounded-full border text-sm font-medium transition
              ${
                activeSection === item.key
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "bg-white text-maroon-700 border-maroon-700 hover:bg-maroon-50"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default StudentCentre;
