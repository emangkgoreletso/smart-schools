import React, { useState } from "react";
import { motion } from "framer-motion";

const SubmissionsPage: React.FC = () => {
  // Temporary mock data — backend integration later
  const [submissions] = useState([
    {
      id: 1,
      assignmentTitle: "Math Homework",
      submittedOn: "2025-10-14",
      grade: "A",
      status: "Reviewed",
    },
    {
      id: 2,
      assignmentTitle: "Science Report",
      submittedOn: "2025-10-15",
      grade: "-",
      status: "Pending",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-2">Submissions</h1>
        <p>Track assignments you have submitted.</p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
      >
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-maroon-700 text-white">
              <th className="py-3 px-4 text-left">Assignment</th>
              <th className="py-3 px-4 text-center">Submitted On</th>
              <th className="py-3 px-4 text-center">Grade</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((s) => (
              <tr
                key={s.id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-4">{s.assignmentTitle}</td>
                <td className="py-3 px-4 text-center">{s.submittedOn}</td>
                <td className="py-3 px-4 text-center">{s.grade}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      s.status === "Reviewed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>
    </div>
  );
};

export default SubmissionsPage;
