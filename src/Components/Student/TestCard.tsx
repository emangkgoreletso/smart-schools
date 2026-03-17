import React from "react";

interface Test {
  id: string;
  subject: string;
  title: string;
  duration: number;
  totalMarks: number;
  status: string;
  dueDate: string;
}

const TestCard: React.FC<{
  test: Test;
  onStart: (id: string) => void;
}> = ({ test, onStart }) => {
  const statusColor = {
    not_started: "bg-gray-100 text-gray-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    submitted: "bg-green-100 text-green-700",
  } as any;

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <div className="flex justify-between">
        <h3 className="font-semibold">{test.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${statusColor[test.status]}`}
        >
          {test.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-600">{test.subject}</p>

      <div className="flex justify-between text-sm">
        <span>⏱ {test.duration} mins</span>
        <span>📝 {test.totalMarks} marks</span>
      </div>

      {test.status !== "submitted" && (
        <button
          onClick={() => onStart(test.id)}
          className="w-full bg-maroon-700 text-white py-2 rounded hover:bg-maroon-800"
        >
          {test.status === "in_progress" ? "Continue Test" : "Start Test"}
        </button>
      )}
    </div>
  );
};

export default TestCard;
