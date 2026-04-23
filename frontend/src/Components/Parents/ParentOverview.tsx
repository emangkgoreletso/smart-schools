import React from "react";

interface Props {
  childId: string;
}

const ParentOverview: React.FC<Props> = ({ childId }) => {

  const stats = {
    attendanceRate: 92,
    assignmentAverage: 75,
    testAverage: 70,
    overallAverage: 73,
  };

  return (
    <div className="space-y-6">

      <h3 className="text-lg font-semibold text-maroon-700">
        Student Overview
      </h3>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Attendance</p>
          <p className="text-xl font-bold text-maroon-700">
            {stats.attendanceRate}%
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Assignments Avg</p>
          <p className="text-xl font-bold text-maroon-700">
            {stats.assignmentAverage}%
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Tests Avg</p>
          <p className="text-xl font-bold text-maroon-700">
            {stats.testAverage}%
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Overall Avg</p>
          <p className="text-xl font-bold text-maroon-700">
            {stats.overallAverage}%
          </p>
        </div>

      </div>

    </div>
  );
};

export default ParentOverview;