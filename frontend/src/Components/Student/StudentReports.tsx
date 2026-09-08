import React, { useMemo, useState } from "react";

/* =========================
TYPES
========================= */

interface TermReport {
  term: "Term 1" | "Term 2" | "Term 3";
  average: number;
  attendance: number;
  position: number;
  totalStudents: number;
  remarks: string;
}

interface SubjectGrade {
  subject: string;
  score: number;
  grade: string;
}

/* =========================
MOCK DATA (replace with API later)
========================= */

const mockTermReports: TermReport[] = [
  {
    term: "Term 1",
    average: 72,
    attendance: 91,
    position: 5,
    totalStudents: 40,
    remarks: "Good performance. Keep improving in Mathematics.",
  },
  {
    term: "Term 2",
    average: 78,
    attendance: 94,
    position: 3,
    totalStudents: 40,
    remarks: "Strong improvement across all subjects.",
  },
  {
    term: "Term 3",
    average: 80,
    attendance: 96,
    position: 2,
    totalStudents: 40,
    remarks: "Excellent final term performance.",
  },
];

const mockSubjectGrades: Record<string, SubjectGrade[]> = {
  "Term 1": [
    { subject: "Mathematics", score: 68, grade: "B" },
    { subject: "Biology", score: 74, grade: "A-" },
    { subject: "English", score: 78, grade: "A-" },
  ],
  "Term 2": [
    { subject: "Mathematics", score: 75, grade: "A-" },
    { subject: "Biology", score: 80, grade: "A" },
    { subject: "English", score: 79, grade: "A-" },
  ],
  "Term 3": [
    { subject: "Mathematics", score: 82, grade: "A" },
    { subject: "Biology", score: 81, grade: "A" },
    { subject: "English", score: 77, grade: "A-" },
  ],
};

/* =========================
COMPONENT
========================= */

const StudentReports: React.FC = () => {
  const [selectedTerm, setSelectedTerm] =
    useState<TermReport>(mockTermReports[2]); // latest term default

  const subjects = useMemo(() => {
    return mockSubjectGrades[selectedTerm.term] || [];
  }, [selectedTerm]);

  /* =========================
  UI HELPERS
  ========================= */

  const getPerformanceColor = (value: number) => {
    if (value >= 75) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Academic Reports
        </h2>

        <p className="text-sm text-gray-600">
          View your official term-based academic performance
        </p>
      </div>

      {/* TERM SELECTOR */}
      <div className="flex gap-2 flex-wrap">

        {mockTermReports.map((t) => (
          <button
            key={t.term}
            onClick={() => setSelectedTerm(t)}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${
                selectedTerm.term === t.term
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
              }`}
          >
            {t.term}
          </button>
        ))}

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Average</p>
          <p className={`text-2xl font-bold ${getPerformanceColor(selectedTerm.average)}`}>
            {selectedTerm.average}%
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Attendance</p>
          <p className="text-2xl font-bold text-maroon-700">
            {selectedTerm.attendance}%
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Position</p>
          <p className="text-2xl font-bold text-maroon-700">
            {selectedTerm.position}/{selectedTerm.totalStudents}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-lg font-bold text-green-600">
            Promising
          </p>
        </div>

      </div>

      {/* SUBJECT BREAKDOWN */}
      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-maroon-700 mb-3">
          Subject Performance
        </h3>

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Subject</th>
              <th className="p-2">Score</th>
              <th className="p-2">Grade</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((s) => (
              <tr key={s.subject} className="border-t">

                <td className="p-2 font-medium">
                  {s.subject}
                </td>

                <td className={`p-2 ${getPerformanceColor(s.score)}`}>
                  {s.score}%
                </td>

                <td className="p-2 font-semibold text-maroon-700">
                  {s.grade}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* REMARKS */}
      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-maroon-700 mb-2">
          Teacher Remarks
        </h3>

        <p className="text-sm text-gray-700">
          {selectedTerm.remarks}
        </p>

      </div>

    </div>
  );
};

export default StudentReports;