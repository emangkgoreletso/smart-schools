import React, { useMemo, useState } from "react";

/* =========================
TYPES
========================= */

type AssessmentType = "Assignment" | "Quiz" | "Test" | "Classwork";

type Status =
  | "Pending"
  | "Submitted"
  | "Graded"
  | "Overdue";

interface Assessment {
  id: string;
  title: string;
  subject: string;
  type: AssessmentType;
  dueDate: string;
  status: Status;
  maxScore: number;
  score?: number;
  feedback?: string;
}

interface Props {
  assessments: Assessment[];
}

/* =========================
HELPERS
========================= */

const getStatusColor = (status: Status) => {
  switch (status) {
    case "Submitted":
      return "text-blue-600";
    case "Graded":
      return "text-green-600";
    case "Overdue":
      return "text-red-600";
    default:
      return "text-yellow-600";
  }
};

const isOverdue = (a: Assessment) => {
  return (
    a.status === "Pending" &&
    new Date(a.dueDate) < new Date()
  );
};

/* =========================
COMPONENT
========================= */

const StudentAssessments: React.FC<Props> = ({
  assessments,
}) => {
  /* =========================
  STATE
  ========================= */

  const [filterType, setFilterType] =
    useState<AssessmentType | "All">("All");

  const [filterStatus, setFilterStatus] =
    useState<Status | "All">("All");

  const [selected, setSelected] =
    useState<Assessment | null>(null);

  const [submissionText, setSubmissionText] =
    useState("");

  /* =========================
  DERIVED DATA
  ========================= */

  const enriched = useMemo(() => {
    return assessments.map((a) => ({
      ...a,
      status: isOverdue(a) ? "Overdue" : a.status,
    }));
  }, [assessments]);

  const filtered = useMemo(() => {
    return enriched.filter((a) => {
      const typeMatch =
        filterType === "All" || a.type === filterType;

      const statusMatch =
        filterStatus === "All" || a.status === filterStatus;

      return typeMatch && statusMatch;
    });
  }, [enriched, filterType, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: assessments.length,
      pending: enriched.filter((a) => a.status === "Pending")
        .length,
      submitted: enriched.filter(
        (a) => a.status === "Submitted"
      ).length,
      graded: enriched.filter((a) => a.status === "Graded")
        .length,
      overdue: enriched.filter((a) => a.status === "Overdue")
        .length,
    };
  }, [enriched]);

  /* =========================
  ACTIONS (SIMULATED SYNC)
  ========================= */

  const handleSubmit = () => {
    if (!selected) return;

    alert(
      `Submitted: ${selected.title}\n\nWork: ${submissionText}`
    );

    setSelected(null);
    setSubmissionText("");
  };

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          My Assessments
        </h2>

        <p className="text-sm text-gray-600">
          Assignments, quizzes, tests, and classwork
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

        <Stat label="Total" value={stats.total} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Submitted" value={stats.submitted} />
        <Stat label="Graded" value={stats.graded} />
        <Stat label="Overdue" value={stats.overdue} />

      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">

        <select
          className="border px-3 py-2 rounded"
          value={filterType}
          onChange={(e) =>
            setFilterType(
              e.target.value as AssessmentType | "All"
            )
          }
        >
          <option value="All">All Types</option>
          <option value="Assignment">Assignment</option>
          <option value="Quiz">Quiz</option>
          <option value="Test">Test</option>
          <option value="Classwork">Classwork</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value as Status | "All"
            )
          }
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Graded">Graded</option>
          <option value="Overdue">Overdue</option>
        </select>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map((a) => (
          <div
            key={a.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelected(a)}
          >

            <div className="flex justify-between">

              <div>
                <p className="font-semibold text-maroon-700">
                  {a.title}
                </p>

                <p className="text-xs text-gray-500">
                  {a.subject} • {a.type}
                </p>
              </div>

              <div className="text-right">

                <p
                  className={`text-sm font-medium ${getStatusColor(
                    a.status
                  )}`}
                >
                  {a.status}
                </p>

                <p className="text-xs text-gray-500">
                  Due: {a.dueDate}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL / DETAIL VIEW */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white w-full max-w-2xl p-6 rounded-lg space-y-4">

            <h3 className="text-xl font-bold text-maroon-700">
              {selected.title}
            </h3>

            <p className="text-sm text-gray-600">
              {selected.subject} • {selected.type}
            </p>

            <p className="text-sm">
              Status:{" "}
              <span
                className={getStatusColor(selected.status)}
              >
                {selected.status}
              </span>
            </p>

            <p className="text-sm">
              Due Date: {selected.dueDate}
            </p>

            {/* GRADE VIEW (TEACHER SYNC) */}
            {selected.status === "Graded" && (
              <div className="border p-3 rounded bg-green-50">
                <p className="font-semibold">
                  Score: {selected.score} /{" "}
                  {selected.maxScore}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Feedback: {selected.feedback}
                </p>
              </div>
            )}

            {/* SUBMISSION AREA */}
            {selected.status === "Pending" && (
              <div className="space-y-2">

                <textarea
                  className="w-full border p-2 rounded"
                  rows={4}
                  placeholder="Write your submission..."
                  value={submissionText}
                  onChange={(e) =>
                    setSubmissionText(e.target.value)
                  }
                />

                <button
                  onClick={handleSubmit}
                  className="bg-maroon-700 text-white px-4 py-2 rounded"
                >
                  Submit Work
                </button>

              </div>
            )}

            <button
              onClick={() => setSelected(null)}
              className="text-sm text-gray-500"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

/* =========================
REUSABLE STAT CARD
========================= */

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="bg-white border rounded-lg p-3 text-center">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-lg font-bold text-maroon-700">
      {value}
    </p>
  </div>
);

export default StudentAssessments;