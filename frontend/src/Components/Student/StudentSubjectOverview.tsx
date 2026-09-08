import React from "react";

import { Subject, StudentPerformance } from "../../Domain/LMS";

/* =========================================
TYPES
========================================= */

interface SubjectStats {
  materialsCount: number;
  discussionsCount: number;
  assignmentsCount: number;
  testsCount: number;
  attendanceRate: number;
  progress: number;
}

interface Props {
  subject: Subject;
  stats: SubjectStats;
  studentPerformance: StudentPerformance;
}

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

const StudentSubjectOverview: React.FC<Props> = ({
  stats,
  studentPerformance,
}) => {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Your Subject Overview
        </h2>

        <p className="text-sm text-gray-600">
          Activity and performance summary
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Materials</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.materialsCount}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Assignments</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.assignmentsCount}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Tests</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.testsCount}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Discussions</p>
          <p className="text-2xl font-bold text-maroon-700">
            {stats.discussionsCount}
          </p>
        </div>

      </div>

      {/* PROGRESS + ATTENDANCE */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ATTENDANCE */}
        <div className="border rounded-lg p-5">

          <h3 className="font-semibold text-maroon-700 mb-3">
            Attendance
          </h3>

          <p className={`text-3xl font-bold ${colorByScore(stats.attendanceRate)}`}>
            {stats.attendanceRate}%
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Your attendance rate for this subject
          </p>

        </div>

        {/* COURSE PROGRESS */}
        <div className="border rounded-lg p-5">

          <h3 className="font-semibold text-maroon-700 mb-3">
            Course Progress
          </h3>

          <p className="text-3xl font-bold text-maroon-700">
            {stats.progress}%
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Completion of learning materials
          </p>

        </div>

      </div>

      {/* PERFORMANCE */}
      <div className="border rounded-lg p-5">

        <h3 className="font-semibold text-maroon-700 mb-4">
          Your Performance
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-lg p-4 text-center">

            <p className="text-sm text-gray-500">
              Overall Average
            </p>

            <p className={`text-2xl font-bold ${colorByScore(studentPerformance.overallAverage)}`}>
              {studentPerformance.overallAverage}%
            </p>

          </div>

          <div className="border rounded-lg p-4 text-center">

            <p className="text-sm text-gray-500">
              Assignment Average
            </p>

            <p className={`text-2xl font-bold ${colorByScore(studentPerformance.assignmentAverage)}`}>
              {studentPerformance.assignmentAverage}%
            </p>

          </div>

          <div className="border rounded-lg p-4 text-center">

            <p className="text-sm text-gray-500">
              Test Average
            </p>

            <p className={`text-2xl font-bold ${colorByScore(studentPerformance.testAverage)}`}>
              {studentPerformance.testAverage}%
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentSubjectOverview;