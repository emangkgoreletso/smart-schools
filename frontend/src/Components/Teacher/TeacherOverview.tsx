import React, { useMemo } from "react";

/* =========================================
TYPES
========================================= */

interface ClassRef {
  id: string;
  name: string;
}

interface Props {
  subjectId: string;
  stats: {
    totalClasses: number;
    totalStudents: number;
    materialsCount: number;
    discussionsCount: number;
  };
  classes: ClassRef[];
}

/* =========================================
MOCK PERFORMANCE DATA (replace with API later)
========================================= */

interface ClassPerformance {
  className: string;
  avgScore: number;
  passRate: number;
}

const mockPerformance: ClassPerformance[] = [
  { className: "Form 3A", avgScore: 68, passRate: 82 },
  { className: "Form 3B", avgScore: 74, passRate: 89 },
  { className: "Form 3C", avgScore: 71, passRate: 86 },
];

/* =========================================
HELPERS
========================================= */

const colorByScore = (value: number) => {
  if (value >= 75) return "text-green-600";
  if (value >= 50) return "text-yellow-600";
  return "text-red-600";
};

/* =========================================
COMPONENT
========================================= */

const TeacherOverview: React.FC<Props> = ({
  subjectId,
  stats,
}) => {
  /* =========================================
  DERIVED DATA
  ========================================= */

  const topClass = useMemo(() => {
    return [...mockPerformance].sort(
      (a, b) => b.avgScore - a.avgScore
    )[0];
  }, []);

  const lowPerformingClasses = useMemo(() => {
    return mockPerformance.filter((c) => c.avgScore < 60);
  }, []);

  /* =========================================
  UI
  ========================================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Subject Overview
        </h2>

        <p className="text-sm text-gray-600">
          High-level analytics for Subject ID: {subjectId}
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Classes</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.totalClasses}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Students</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.totalStudents}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Materials</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.materialsCount}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Discussions</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.discussionsCount}
          </p>
        </div>

      </div>

      {/* CLASS PERFORMANCE TABLE */}
      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-maroon-700 mb-3">
          Class Performance Overview
        </h3>

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Class</th>
              <th className="p-2">Average Score</th>
              <th className="p-2">Pass Rate</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {mockPerformance.map((c) => (
              <tr key={c.className} className="border-t">

                <td className="p-2 font-medium">
                  {c.className}
                </td>

                <td className={`p-2 ${colorByScore(c.avgScore)}`}>
                  {c.avgScore}%
                </td>

                <td className="p-2">
                  {c.passRate}%
                </td>

                <td className="p-2">
                  {c.avgScore >= 70 ? (
                    <span className="text-green-600 font-medium">
                      Good
                    </span>
                  ) : c.avgScore >= 50 ? (
                    <span className="text-yellow-600 font-medium">
                      Average
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      At Risk
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* INSIGHTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* TOP CLASS */}
        <div className="border rounded-lg p-4">

          <h3 className="font-semibold text-green-700 mb-2">
            Top Performing Class
          </h3>

          <p className="text-lg font-bold text-maroon-700">
            {topClass.className}
          </p>

          <p className="text-sm text-gray-600">
            Average Score: {topClass.avgScore}%
          </p>

          <p className="text-sm text-gray-600">
            Pass Rate: {topClass.passRate}%
          </p>

        </div>

        {/* AT RISK CLASSES */}
        <div className="border rounded-lg p-4">

          <h3 className="font-semibold text-red-600 mb-2">
            At-Risk Classes
          </h3>

          {lowPerformingClasses.length === 0 ? (
            <p className="text-sm text-gray-500">
              No at-risk classes 🎉
            </p>
          ) : (
            lowPerformingClasses.map((c) => (
              <p key={c.className} className="text-sm">
                {c.className} ({c.avgScore}%)
              </p>
            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default TeacherOverview;