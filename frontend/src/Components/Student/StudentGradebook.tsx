import React, { useMemo } from "react";

interface Grade {
  subject: string;
  term: 1 | 2 | 3;
  average: number;
  rank: number;
}

interface Props {
  grades: Grade[];
}

const StudentGradebook: React.FC<Props> = ({ grades }) => {
  const overall = useMemo(() => {
    if (!grades.length) return 0;
    return Math.round(
      grades.reduce((sum, g) => sum + g.average, 0) / grades.length
    );
  }, [grades]);

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-maroon-700">
        My Gradebook
      </h2>

      <div className="grid grid-cols-3 gap-4">

        <div className="border p-4 rounded text-center">
          <p className="text-sm text-gray-500">Overall Average</p>
          <p className="text-2xl font-bold text-maroon-700">
            {overall}%
          </p>
        </div>

        <div className="border p-4 rounded text-center">
          <p className="text-sm text-gray-500">Subjects</p>
          <p className="text-2xl font-bold">{grades.length}</p>
        </div>

        <div className="border p-4 rounded text-center">
          <p className="text-sm text-gray-500">Best Subject</p>
          <p className="text-2xl font-bold text-green-600">
            {grades.sort((a, b) => b.average - a.average)[0]?.subject || "-"}
          </p>
        </div>

      </div>

      <div className="space-y-2">

        {grades.map((g, i) => (
          <div
            key={i}
            className="border p-3 rounded flex justify-between"
          >
            <p className="font-medium">{g.subject}</p>
            <p className="text-maroon-700 font-bold">
              {g.average}%
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default StudentGradebook;