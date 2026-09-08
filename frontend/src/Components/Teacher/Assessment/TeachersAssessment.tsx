import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  subjectId: string;
  classes: {
    id: string;
    name: string;
  }[];
}

type Tab = "Assignments" | "Quizzes" | "Tests" | "Classwork";

interface AssessmentItem {
  id: string;
  title: string;
  className: string;
  dueDate: string;
  submissions: number;
}

const API_URL = "https://localhost:5001/api/assessments";

const TeachersAssessment: React.FC<Props> = ({ subjectId }) => {
  const [active, setActive] = useState<Tab>("Assignments");
  const [data, setData] = useState<AssessmentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadData = async (tab: Tab) => {
    setLoading(true);
    try {
      // Map frontend tab → backend enum
      const typeMap: Record<Tab, string> = {
        Assignments: "Assignment",
        Quizzes: "Quiz",
        Tests: "Test",
        Classwork: "Classwork",
      };

      const res = await axios.get(
        `${API_URL}/type/${typeMap[tab]}`
      );

      setData(res.data);
    } catch (err) {
      console.error("Failed to load assessments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(active);
  }, [active]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-maroon-700">
            Assessments
          </h2>
          <p className="text-sm text-gray-600">
            Subject ID: {subjectId}
          </p>
        </div>

        <button
  onClick={() => setShowCreateModal(true)}
  className="bg-maroon-700 text-white px-4 py-2 rounded"
>
  + Create Assessment
</button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 flex-wrap">
        {(["Assignments", "Quizzes", "Tests", "Classwork"] as Tab[]).map(
          (t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1 rounded-full text-sm border ${
                active === t
                  ? "bg-maroon-700 text-white"
                  : "border-gray-300"
              }`}
            >
              {t}
            </button>
          )
        )}
      </div>

      {/* CONTENT */}
      <div className="border rounded-lg overflow-hidden">

        {loading ? (
          <p className="p-4 text-sm text-gray-500">Loading...</p>
        ) : (
          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Class</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Submissions</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t">

                  <td className="p-3 font-medium">
                    {item.title}
                  </td>

                  <td className="p-3">{item.className}</td>
                  <td className="p-3">{item.dueDate}</td>
                  <td className="p-3">{item.submissions}</td>

                  <td className="p-3 flex gap-2">
                    <button className="text-blue-600 text-sm">View</button>
                    <button className="text-green-600 text-sm">Mark</button>
                    <button className="text-red-600 text-sm">Delete</button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default TeachersAssessment;