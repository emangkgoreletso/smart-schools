import React, { useState } from "react";
import TeacherDashboard from "../Components/Teacher/TeacherDashboard";
import TeacherSubjectsManager from "../Components/Teacher/TeacherSubjectsManager";

type TeacherSection = "dashboard" | "subjects";

const TeacherCentre: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<TeacherSection>("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <TeacherDashboard />;

      case "subjects":
        return <TeacherSubjectsManager />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-maroon-700">
          Teacher Centre
        </h1>

        <p className="text-sm text-gray-600">
          Manage your teaching dashboard and subjects
        </p>
      </div>

      {/* NAVIGATION */}
      <div className="flex gap-3 mb-6">
        {[
          { key: "dashboard", label: "Dashboard" },
          { key: "subjects", label: "My Subjects" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setActiveSection(item.key as TeacherSection)
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

export default TeacherCentre;