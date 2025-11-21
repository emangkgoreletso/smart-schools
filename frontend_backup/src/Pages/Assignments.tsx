import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClipboardList, FaFileUpload } from "react-icons/fa";

const Assignments: React.FC = () => {
  const assignments = [
    { id: 1, title: "Math Homework", dueDate: "2025-10-12", status: "Pending" },
    { id: 2, title: "Science Report", dueDate: "2025-10-15", status: "Submitted" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-2">Assignments</h1>
        <p>View, download, and submit your assignments.</p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
      >
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-maroon-700 text-white">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr
                key={a.id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-4">{a.title}</td>
                <td className="py-3 px-4 text-center">{a.dueDate}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      a.status === "Submitted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
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
                    <FaFileUpload /> Submit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>
    </div>
  );
};

export default Assignments;
