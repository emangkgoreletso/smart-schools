import React from "react";
import ReportCard from "../Shared/ReportCard/ReportCard";

/* =========================
TYPES
========================= */


interface SubjectReport {
  subject: string;
  mark: number;
  grade: string;
  teacherRemark: string;
}

interface MonthlyPerformance {
  month: string;
  average: number;
}

interface Props {
  studentId: string;
}

/* =========================
MOCK DATA (API LATER)
========================= */

const termReport: SubjectReport[] = [
  {
    subject: "Mathematics",
    mark: 78,
    grade: "B+",
    teacherRemark: "Good analytical skills",
  },
  {
    subject: "English",
    mark: 72,
    grade: "B",
    teacherRemark: "Strong writing ability",
  },
  {
    subject: "Physics",
    mark: 65,
    grade: "C+",
    teacherRemark: "Needs more practice",
  },
  {
    subject: "Chemistry",
    mark: 70,
    grade: "B",
    teacherRemark: "Improving steadily",
  },
  {
    subject: "Geography",
    mark: 82,
    grade: "A",
    teacherRemark: "Excellent participation",
  },
];

const monthlyPerformance: MonthlyPerformance[] = [
  { month: "January", average: 68 },
  { month: "February", average: 72 },
  { month: "March", average: 75 },
];

/* =========================
COMPONENT
========================= */

const ParentPerformance: React.FC<Props> = ({ studentId }) => {
  const studentName = "Neo Dlamini";
  const studentClass = "Form 3A";
  const term = 1;
  const year = 2026;
  const classPosition = 5;
  const totalStudents = 42;

  const overallAverage =
    termReport.reduce((acc, s) => acc + s.mark, 0) / termReport.length;

  const headTeacherRemark =
    "Neo has demonstrated consistent academic growth this term. With continued effort and discipline, even greater achievements are expected.";

  /* =========================
  DOWNLOAD REPORT
  ========================= */

  const downloadReport = () => {
    window.print();
  };

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-maroon-700">
          Academic Performance
        </h2>

        <button
          onClick={downloadReport}
          className="bg-maroon-700 text-white px-4 py-2 rounded text-sm"
        >
          Download Report
        </button>
      </div>

      {/* STUDENT INFO */}
      <div className="bg-gray-50 p-4 rounded border grid md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Student</p>
          <p className="font-semibold">{studentName}</p>
        </div>

        <div>
          <p className="text-gray-500">Class</p>
          <p className="font-semibold">{studentClass}</p>
        </div>

        <div>
          <p className="text-gray-500">Term</p>
          <p className="font-semibold">{term}</p>
        </div>

        <div>
          <p className="text-gray-500">Year</p>
          <p className="font-semibold">{year}</p>
        </div>
      </div>

      {/* MONTHLY PERFORMANCE */}
      <div className="bg-white p-5 rounded-lg shadow">

        <h3 className="font-semibold text-maroon-700 mb-3">
          Monthly Performance
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {monthlyPerformance.map((m) => (
            <div
              key={m.month}
              className="border rounded-lg p-4 text-center"
            >
              <p className="text-sm text-gray-500">{m.month}</p>

              <p className="text-xl font-bold text-maroon-700">
                {m.average}%
              </p>

              <p className="text-xs text-gray-400">
                Average Score
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* TERM REPORT TABLE */}
      <div className="bg-white p-5 rounded-lg shadow">

        <h3 className="font-semibold text-maroon-700 mb-4">
          End of Term Report
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm border">

            <thead className="bg-maroon-700 text-white">

              <tr>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Mark</th>
                <th className="p-3 text-left">Grade</th>
                <th className="p-3 text-left">Teacher Remark</th>
              </tr>

            </thead>

            <tbody>

              {termReport.map((s) => (
                <tr key={s.subject} className="border-b">

                  <td className="p-3 font-medium">
                    {s.subject}
                  </td>

                  <td className="p-3">
                    {s.mark}%
                  </td>

                  <td className="p-3 font-semibold text-maroon-700">
                    {s.grade}
                  </td>

                  <td className="p-3 text-gray-600">
                    {s.teacherRemark}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* PERFORMANCE SUMMARY */}
      <div className="bg-white p-5 rounded-lg shadow grid md:grid-cols-3 gap-4 text-center">

        <div>
          <p className="text-gray-500 text-sm">
            Overall Average
          </p>

          <p className="text-xl font-bold text-maroon-700">
            {overallAverage.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Class Position
          </p>

          <p className="text-xl font-bold">
            {classPosition} / {totalStudents}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Term
          </p>

          <p className="text-xl font-bold">
            Term {term}
          </p>
        </div>

      </div>

      {/* HEADTEACHER REMARK */}
      <div className="bg-white p-5 rounded-lg shadow">

        <h3 className="font-semibold text-maroon-700 mb-2">
          Headteacher Remark
        </h3>

        <p className="text-sm text-gray-700">
          {headTeacherRemark}
        </p>

        <div className="flex justify-between mt-6 text-sm">

          <div>
            <p className="text-gray-500">Date</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          <div className="text-center">
            <p className="text-gray-500">School Stamp</p>

            <div className="border h-12 w-32 mt-1"></div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ParentPerformance;