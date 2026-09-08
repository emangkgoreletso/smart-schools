import React, { useState } from "react";
import TermReportView from "./TermReportView";

interface ReportRecord {
  year: number;
  term: number;
}

interface Props {
  studentId: string;
  //year: number;
  //term: number;
}

/* =========================
MOCK DATA (API LATER)
========================= */

const historyReports: ReportRecord[] = [
  { year: 2025, term: 1 },
  { year: 2025, term: 2 },
  { year: 2025, term: 3 },
  { year: 2024, term: 1 },
  { year: 2024, term: 2 },
  { year: 2024, term: 3 },
];

/* =========================
COMPONENT
========================= */

const AcademicHistory: React.FC<Props> = ({ studentId }) => {

  const [selectedReport, setSelectedReport] =
    useState<ReportRecord | null>(null);

  /* =========================
  OPEN REPORT
  ========================= */

  const openReport = (report: ReportRecord) => {
    setSelectedReport(report);
  };

  /* =========================
  BACK TO LIST
  ========================= */

  const closeReport = () => {
    setSelectedReport(null);
  };

  /* =========================
  REPORT VIEW MODE
  ========================= */

  if (selectedReport) {
    return (
      <div className="space-y-4">

        <button
          onClick={closeReport}
          className="text-sm text-maroon-700 underline"
        >
          ← Back to Academic History
        </button>

        <TermReportView
          studentId={studentId}
          term={selectedReport.term}
          year={selectedReport.year}
        />

      </div>
    );
  }

  /* =========================
  HISTORY LIST
  ========================= */

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-maroon-700">
        Academic History
      </h2>

      <div className="bg-white rounded-lg shadow p-4">

        <table className="w-full text-sm border">

          <thead className="bg-maroon-700 text-white">

            <tr>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Term</th>
              <th className="p-3 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {historyReports.map((report, index) => (

              <tr key={index} className="border-b">

                <td className="p-3 font-medium">
                  {report.year}
                </td>

                <td className="p-3">
                  Term {report.term}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => openReport(report)}
                    className="text-maroon-700 font-semibold"
                  >
                    View Report
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AcademicHistory;