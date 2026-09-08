import React, { useState } from "react";
import { SubjectProps } from "../../Types/SubjectProps";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  points: number;
}

const TeacherAssignments: React.FC<SubjectProps> = ({ subjectId }) => {

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState(100);

  const createAssignment = () => {
    if (!title || !dueDate) return;

    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title,
      dueDate,
      points,
    };

    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-xl font-bold">
        Assignments – Subject {subjectId}
      </h2>

      {/* Create Assignment */}
      <div className="border p-4 rounded space-y-2">
        <input
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="border p-2 rounded"
        />

        <button
          onClick={createAssignment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Assignment
        </button>
      </div>

      {/* Assignment Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Due Date</th>
            <th className="border p-2 text-left">Points</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.title}</td>
              <td className="border p-2">{a.dueDate}</td>
              <td className="border p-2">{a.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TeacherAssignments;