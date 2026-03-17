// src/Pages/AcademicRecords.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PerformanceView from "../Components/Student/PerformanceView";
import ReportsSection from "../Components/Student/ReportsSection";

type Tab = "performance" | "reports";
type Term = "Term 1" | "Term 2" | "Term 3";

const AcademicRecords: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("performance");
  const [term, setTerm] = useState<Term>("Term 1");

  /* =============================
     MOCK KPI DATA
  ============================= */
  const summary = {
    average: "B+",
    gpa: "3.4",
    attendance: "92%",
    rank: "Top 15%",
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-maroon-700">
          📊 Academic Analytics Dashboard
        </h2>
        <p className="text-sm text-gray-600">
          Performance tracking, academic reports and progress analytics
        </p>
      </div>

      {/* =============================
          KPI SUMMARY CARDS
      ============================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Average Grade" value={summary.average} />
        <SummaryCard title="GPA" value={summary.gpa} />
        <SummaryCard title="Attendance" value={summary.attendance} />
        <SummaryCard title="Class Rank" value={summary.rank} />
      </div>

      {/* =============================
          SCHOOL CALENDAR LINK ONLY
      ============================= */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-maroon-700">
            📅 School Calendar
          </h3>
          <p className="text-sm text-gray-600">
            View academic events, holidays and schedules
          </p>
        </div>

        <Link
          to="/student-centre?section=attendance"
          className="px-4 py-2 rounded-full border border-maroon-700 text-maroon-700 hover:bg-maroon-50 text-sm"
        >
          Open Calendar
        </Link>
      </div>

      {/* =============================
          REPORT ACTION BAR
      ============================= */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2">
          {(["Term 1", "Term 2", "Term 3"] as Term[]).map((t) => (
            <button
              key={t}
              onClick={() => setTerm(t)}
              className={`px-3 py-1 rounded-full text-sm border
                ${
                  term === t
                    ? "bg-maroon-700 text-white border-maroon-700"
                    : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* DOWNLOAD BUTTONS RESTORED */}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full bg-maroon-700 text-white text-sm hover:bg-maroon-800">
            Download Term Report
          </button>

          <button className="px-4 py-2 rounded-full border border-maroon-700 text-maroon-700 text-sm hover:bg-maroon-50">
            Download Performance Summary
          </button>
        </div>
      </div>

      {/* =============================
          TAB SWITCHER
      ============================= */}
      <div className="flex gap-3">
        <TabButton
          label="Performance Analytics"
          active={activeTab === "performance"}
          onClick={() => setActiveTab("performance")}
        />

        <TabButton
          label="Academic Reports"
          active={activeTab === "reports"}
          onClick={() => setActiveTab("reports")}
        />
      </div>

      {/* =============================
          CONTENT AREA
      ============================= */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "performance" && (
          <div className="space-y-6">
            {/* PERFORMANCE GRAPH SECTION */}
            <div>
              <h3 className="font-semibold text-maroon-700 mb-2">
                📈 Performance Trends
              </h3>

              <PerformanceView />
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <ReportsSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicRecords;

/* ===================================================
   SMALL REUSABLE COMPONENTS
=================================================== */

const SummaryCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-maroon-700">{value}</p>
  </div>
);

const TabButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm border
      ${
        active
          ? "bg-maroon-700 text-white border-maroon-700"
          : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
      }`}
  >
    {label}
  </button>
);
