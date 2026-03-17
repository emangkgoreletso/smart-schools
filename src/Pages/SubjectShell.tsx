// src/Pages/SubjectShell.tsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AssignmentsTab from "../Components/Student/Subjects/AssignmentsTab";
import DiscussionsTab from "../Components/Student/Subjects/DiscussionsTab";
import TestsTab from "../Components/Student/Subjects/TestsTab";
import MaterialsTab from "../Components/Student/Subjects/MaterialsTab";
import GradesTab from "../Components/Student/Subjects/GradesTab";

type Tab =
  | "overview"
  | "discussions"
  | "assignments"
  | "tests"
  | "materials"
  | "grades";

const SubjectShell: React.FC = () => {
  const { subjectId } = useParams();
  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

  // In production → fetch subject details using subjectId

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-maroon-700">
        Subject Workspace
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 flex-wrap">
        {[
          "overview",
          "discussions",
          "assignments",
          "tests",
          "materials",
          "grades",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as Tab)
            }
            className={`px-4 py-2 rounded-full border text-sm transition ${
              activeTab === tab
                ? "bg-maroon-700 text-white"
                : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <div>
            <p className="text-gray-600">
              Overview content here.
            </p>
          </div>
        )}

        {activeTab === "discussions" && (
          <DiscussionsTab subjectId={subjectId!} />
        )}

        {activeTab === "assignments" && (
          <AssignmentsTab subjectId={subjectId!} />
        )}

        {activeTab === "tests" && (
          <TestsTab subjectId={subjectId!} />
        )}

        {activeTab === "materials" && (
          <MaterialsTab subjectId={subjectId!} />
        )}

        {activeTab === "grades" && (
          <GradesTab subjectId={subjectId!} />
        )}
      </div>
    </div>
  );
};

export default SubjectShell;
