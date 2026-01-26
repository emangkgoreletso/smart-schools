import React, { useState } from "react";

type StudentSection =
  | "dashboard"
  | "subjects"
  | "assignments"
  | "tests"
  | "discussions"
  | "performance"
  | "attendance";

const StudentCentre: React.FC = () => {
  const [activeSection, setActiveSection] = useState<StudentSection>("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <div>📊 Student Dashboard (overview, deadlines, notices)</div>;
      case "subjects":
        return <div>📚 Subjects & Course Materials</div>;
      case "assignments":
        return <div>📝 Assignments (upload & download)</div>;
      case "tests":
        return <div>🧪 Online Tests & Quizzes</div>;
      case "discussions":
        return <div>💬 Discussion Groups & Forums</div>;
      case "performance":
        return <div>📈 Grades & Performance</div>;
      case "attendance":
        return <div>📅 Attendance History</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-maroon-700">Student Centre</h1>
        <p className="text-sm text-gray-600">
          All your learning activities in one place
        </p>
      </div>

      {/* INTERNAL NAVIGATION */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: "dashboard", label: "Dashboard" },
          { key: "subjects", label: "Subjects" },
          { key: "assignments", label: "Assignments" },
          { key: "tests", label: "Tests & Quizzes" },
          { key: "discussions", label: "Discussions" },
          { key: "performance", label: "Performance" },
          { key: "attendance", label: "Attendance" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key as StudentSection)}
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

      {/* CONTENT AREA */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default StudentCentre;
