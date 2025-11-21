import React, { useEffect, useState } from "react";
import { getAssignments, deleteAssignment } from "../Api/Api";
import { Assignment } from "../Types/Assignment";

interface Props {
  onEdit: (assignment: Assignment) => void;
}

const AssignmentTable: React.FC<Props> = ({ onEdit }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return; // ✅ Prevent undefined
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await deleteAssignment(id);
      setAssignments(assignments.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting assignment:", err);
      alert("Failed to delete assignment.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading assignments...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead className="bg-maroon-700 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Due Date</th>
            <th className="py-2 px-4 text-left">Teacher</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No assignments available.
              </td>
            </tr>
          ) : (
            assignments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{a.title}</td>
                <td className="py-2 px-4">{a.description}</td>
                <td className="py-2 px-4">
                  {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "—"}
                </td>
                <td className="py-2 px-4">{a.teacherId ?? "N/A"}</td>
                <td className="py-2 px-4 text-center space-x-3">
                  <button
                    onClick={() => onEdit(a)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
