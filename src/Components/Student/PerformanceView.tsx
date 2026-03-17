import React from "react";

interface SubjectPerformance {
  id: string;
  subject: string;
  average: string;
  lastAssessment: string;
  grade: string;
}

const PerformanceView: React.FC = () => {
  const performance: SubjectPerformance[] = [
    {
      id: "1",
      subject: "Mathematics",
      average: "78%",
      lastAssessment: "Test 3",
      grade: "B",
    },
    {
      id: "2",
      subject: "English",
      average: "85%",
      lastAssessment: "Essay",
      grade: "A",
    },
    {
      id: "3",
      subject: "Physics",
      average: "69%",
      lastAssessment: "Lab Report",
      grade: "C+",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Academic Performance & Grades
      </h2>

      <div className="space-y-4">
        {performance.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{p.subject}</p>
              <p className="text-sm text-gray-600">
                Last: {p.lastAssessment}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">Average</p>
              <p className="font-semibold">{p.average}</p>
              <p className="text-sm text-gray-500">Grade: {p.grade}</p>
            </div>
          </div>
        ))}
      </div>

      {performance.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No performance data available.
        </p>
      )}
    </div>
  );
};

export default PerformanceView;