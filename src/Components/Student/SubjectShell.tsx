import React, { useState } from "react";

type SubjectTab =
  | "materials"
  | "assignments"
  | "tests"
  | "notices"
  | "discussions";

interface Subject {
  id: string;
  name: string;
  teacher: string;
}

interface Props {
  subject: Subject;
  onBack: () => void;
}

const SubjectShell: React.FC<Props> = ({ subject, onBack }) => {
  const [activeTab, setActiveTab] = useState<SubjectTab>("materials");

  const tabs: { key: SubjectTab; label: string }[] = [
    { key: "materials", label: "Materials" },
    { key: "assignments", label: "Assignments" },
    { key: "tests", label: "Tests & Quizzes" },
    { key: "notices", label: "Notices" },
    { key: "discussions", label: "Discussions" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-maroon-700">
            {subject.name}
          </h2>
          <p className="text-sm text-gray-600">
            Teacher: {subject.teacher}
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-maroon-700 text-maroon-700 hover:bg-maroon-50"
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition
              ${
                activeTab === t.key
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="border rounded-lg p-4 min-h-[200px]">
        {activeTab === "materials" && (
          <p className="text-gray-600">
            📘 Course materials will appear here.
          </p>
        )}

        {activeTab === "assignments" && (
          <p className="text-gray-600">
            📝 Assignments and submission links will appear here.
          </p>
        )}

        {activeTab === "tests" && (
          <p className="text-gray-600">
            🧪 Online tests and quizzes will appear here.
          </p>
        )}

        {activeTab === "notices" && (
          <p className="text-gray-600">
            📢 Subject-specific notices will appear here.
          </p>
        )}

        {activeTab === "discussions" && (
          <p className="text-gray-600">
            💬 Discussion groups and forums will appear here.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectShell;
