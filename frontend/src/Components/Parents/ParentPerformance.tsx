import React, { useState } from "react";
import TermReportView from "./TermReportView";
import SubjectTrends from "./SubjectTrends";
import AcademicHistory from "./AcademicHistory";

interface Props {
  studentId: string;
}

type Tab = "report" | "trends" | "history";

const ParentPerformance: React.FC<Props> = ({ studentId }) => {

  const [activeTab, setActiveTab] = useState<Tab>("report");

  /* CURRENT TERM REPORT (LATEST) */

  const currentTerm = 1;
  const currentYear = 2026;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Academic Performance
        </h2>
      </div>

      {/* TAB NAVIGATION */}

      <div className="flex gap-2 border-b pb-2">

        <button
          onClick={() => setActiveTab("report")}
          className={`px-4 py-2 text-sm rounded
            ${activeTab === "report"
              ? "bg-maroon-700 text-white"
              : "bg-gray-100"}
          `}
        >
          Term Report
        </button>

        <button
          onClick={() => setActiveTab("trends")}
          className={`px-4 py-2 text-sm rounded
            ${activeTab === "trends"
              ? "bg-maroon-700 text-white"
              : "bg-gray-100"}
          `}
        >
          Subject Trends
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 text-sm rounded
            ${activeTab === "history"
              ? "bg-maroon-700 text-white"
              : "bg-gray-100"}
          `}
        >
          Academic History
        </button>

      </div>

      {/* TAB CONTENT */}

      {activeTab === "report" && (
        <TermReportView
          studentId={studentId}
          term={currentTerm}
          year={currentYear}
        />
      )}

      {activeTab === "trends" && (
        <SubjectTrends studentId={studentId} />
      )}

      {activeTab === "history" && (
        <AcademicHistory studentId={studentId} />
      )}

    </div>
  );
};

export default ParentPerformance;