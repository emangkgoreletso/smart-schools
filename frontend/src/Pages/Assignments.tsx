import React from "react";
import { Link } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { MdUpload } from "react-icons/md"

const UploadIcon = MdUpload as unknown as React.ComponentType;
const Assignments: React.FC = () => {
  const assignments = [
    { id: 1, title: "Math Homework", dueDate: "2025-11-12", status: "Pending" },
    { id: 2, title: "Science Report", dueDate: "2025-11-22", status: "Submitted" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold text-maroon-700 mb-6">📘 Assignments</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-maroon-700 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-center">Due Date</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a) => (
            <tr
              key={a.id}
              className="border-t border-gray-300 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{a.title}</td>

              <td className="py-3 px-4 text-center">{a.dueDate}</td>

              <td className="py-3 px-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    a.status === "Submitted"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {a.status}
                </span>
              </td>

              <td className="py-3 px-4 text-center">
                <Link
  to="/submissions"
  className="inline-flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white px-4 py-2 rounded-full text-sm"
>
  <span className="inline-block">
    <UploadIcon />
  </span>
  Submit
</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
