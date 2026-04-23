import React, { useMemo } from "react";

/* =========================
TYPES
========================= */

interface Subject {
  id: string;
  name: string;
  teacher: string;
  progress: number; // 0 - 100
  materialsCount: number;
  pendingAssessments: number;
}

interface Props {
  subjects: Subject[];
  onOpenSubject: (subject: Subject) => void;
}

/* =========================
HELPERS
========================= */

const getProgressColor = (value: number) => {
  if (value >= 75) return "bg-green-500";
  if (value >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const getProgressLabel = (value: number) => {
  if (value >= 75) return "Excellent progress";
  if (value >= 50) return "Good progress";
  return "Needs attention";
};

/* =========================
COMPONENT
========================= */

const StudentSubjectsManager: React.FC<Props> = ({
  subjects,
  onOpenSubject,
}) => {
  /* =========================
  DERIVED DATA
  ========================= */

  const totalSubjects = useMemo(
    () => subjects.length,
    [subjects]
  );

  const averageProgress = useMemo(() => {
    if (!subjects.length) return 0;
    return Math.round(
      subjects.reduce((sum, s) => sum + s.progress, 0) /
        subjects.length
    );
  }, [subjects]);

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          My Subjects
        </h2>

        <p className="text-sm text-gray-600">
          Access all your enrolled subjects, materials, and assessments
        </p>
      </div>

      {/* SUMMARY BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600">Total Subjects</p>
          <p className="text-2xl font-bold text-maroon-700">
            {totalSubjects}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600">Average Progress</p>
          <p className="text-2xl font-bold text-maroon-700">
            {averageProgress}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-sm font-semibold text-green-600">
            Active Learner
          </p>
        </div>

      </div>

      {/* SUBJECT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => onOpenSubject(subject)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-5 border border-transparent hover:border-maroon-700"
          >

            {/* SUBJECT HEADER */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-maroon-700">
                {subject.name}
              </h3>

              <p className="text-xs text-gray-500">
                Teacher: {subject.teacher}
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div className="mb-3">

              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span className="font-medium">
                  {subject.progress}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(
                    subject.progress
                  )}`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {getProgressLabel(subject.progress)}
              </p>

            </div>

            {/* SUBJECT METRICS */}
            <div className="flex justify-between text-xs text-gray-600">

              <div>
                📁 Materials:{" "}
                <span className="font-medium">
                  {subject.materialsCount}
                </span>
              </div>

              <div>
                📝 Pending:{" "}
                <span className="font-medium text-red-600">
                  {subject.pendingAssessments}
                </span>
              </div>

            </div>

            {/* ACTION BUTTON */}
            <button className="mt-4 w-full bg-maroon-700 text-white py-2 rounded-lg text-sm hover:bg-maroon-800 transition">
              Open Subject
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default StudentSubjectsManager;