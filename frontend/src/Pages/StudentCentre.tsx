import React, { useState } from "react";

import StudentDashboard from "../Components/Student/StudentDashboard";
import StudentSubjectsManager from "../Components/Student/StudentSubjectsManager";
import StudentTimetable from "../Components/Student/StudentTimetable";
import StudentReports from "../Components/Student/StudentReports";
import StudentSubjectShell from "../Components/Student/StudentSubjectShell";

/* =========================
TYPES
========================= */

type StudentSection =
  | "dashboard"
  | "subjects"
  | "timetable"
  | "reports";

/* =========================
MOCK DATA (replace with API later)
========================= */

const mockSubjects = [
  {
    id: "1",
    name: "Mathematics",
    teacher: "Mr Smith",
    progress: 65,
    materialsCount: 8,
    pendingAssessments: 2,
  },
  {
     id: "2",
    name: "Biology",
    teacher: "Mrs Dube",
    progress: 72,
    materialsCount: 5,
    pendingAssessments: 1,
  },
];

/* =========================
COMPONENT
========================= */

const StudentCentre: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<StudentSection>("dashboard");

  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);

  /* =========================
  SUBJECT DRILLDOWN (LEVEL 2)
  ========================= */

  if (selectedSubject) {
    return (
      <StudentSubjectShell
        subject={selectedSubject}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }

  /* =========================
  MAIN RENDER
  ========================= */

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <StudentDashboard />;

      case "subjects":
        return (
          <StudentSubjectsManager
            subjects={mockSubjects}
            onOpenSubject={(subject: any) =>
              setSelectedSubject(subject)
            }
          />
        );

      case "timetable":
        return <StudentTimetable />;

      case "reports":
        return <StudentReports />;

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
          Manage your learning, subjects, timetable and academic progress
        </p>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-wrap gap-3 mb-6">

        {[
          { key: "dashboard", label: "Dashboard" },
          { key: "subjects", label: "My Subjects" },
          { key: "timetable", label: "Timetable" },
          { key: "reports", label: "Reports" },
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