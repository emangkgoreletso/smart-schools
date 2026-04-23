import React, { useState } from "react";

interface Submission {
  id: string;
  student: string;
  status: "Submitted" | "Late" | "Missing";
  file?: string;
  score?: number;
  feedback?: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    student: "Neo Dlamini",
    status: "Submitted",
    file: "neo_assignment.pdf",
    score: 78,
    feedback: "Good work overall.",
  },
  {
    id: "2",
    student: "Naledi Motsamai",
    status: "Late",
    file: "naledi_assignment.pdf",
  },
  {
    id: "3",
    student: "Kabelo Sechele",
    status: "Missing",
  },
];

const TeacherSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = submissions[currentIndex];

  const updateSubmission = (field: string, value: any) => {
    const updated = [...submissions];
    (updated[currentIndex] as any)[field] = value;
    setSubmissions(updated);
  };

  const nextStudent = () => {
    if (currentIndex < submissions.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const prevStudent = () => {
    if (currentIndex > 0)
      setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-maroon-700">
          Assignment Submissions
        </h2>
        <p className="text-sm text-gray-600">
          Review and grade student submissions
        </p>
      </div>

      {/* STUDENT NAVIGATION */}
      <div className="flex justify-between items-center bg-white shadow rounded-lg p-4">
        <button
          onClick={prevStudent}
          className="px-3 py-1 border rounded text-sm"
        >
          ← Previous
        </button>

        <div className="text-sm font-medium">
          {current.student}
        </div>

        <button
          onClick={nextStudent}
          className="px-3 py-1 border rounded text-sm"
        >
          Next →
        </button>
      </div>

      {/* MAIN REVIEW PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Submission Viewer */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">

          <h3 className="font-semibold mb-4">
            Submission
          </h3>

          {current.file ? (
            <div className="space-y-3">

              <p className="text-sm text-gray-600">
                File: {current.file}
              </p>

              <button className="px-4 py-2 rounded-full border border-maroon-700 text-maroon-700 text-sm hover:bg-maroon-50">
                Download File
              </button>

            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No submission received
            </p>
          )}

        </div>

        {/* Grading Panel */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">

          <h3 className="font-semibold">
            Grade & Feedback
          </h3>

          <div>
            <label className="text-sm text-gray-600">
              Score
            </label>

            <input
              type="number"
              value={current.score || ""}
              onChange={(e) =>
                updateSubmission("score", Number(e.target.value))
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Feedback
            </label>

            <textarea
              value={current.feedback || ""}
              onChange={(e) =>
                updateSubmission("feedback", e.target.value)
              }
              rows={4}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <button className="w-full px-4 py-2 bg-maroon-700 text-white rounded-full text-sm hover:bg-maroon-800">
            Save Grade
          </button>

        </div>
      </div>

      {/* STUDENT LIST PANEL */}
      <div className="bg-white shadow rounded-lg p-6">

        <h3 className="font-semibold mb-4">
          Student Submissions
        </h3>

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>

          <tbody>

            {submissions.map((s, index) => (
              <tr
                key={s.id}
                onClick={() => setCurrentIndex(index)}
                className={`border-t cursor-pointer ${
                  index === currentIndex
                    ? "bg-maroon-50"
                    : ""
                }`}
              >
                <td className="p-3 font-medium">
                  {s.student}
                </td>

                <td className="p-3">
                  {s.status}
                </td>

                <td className="p-3">
                  {s.score ?? "-"}
                </td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  );
};

export default TeacherSubmissions;