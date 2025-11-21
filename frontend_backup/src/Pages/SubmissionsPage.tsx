import React from "react";
import { motion } from "framer-motion";
import { FaUpload, FaCheckCircle } from "react-icons/fa";

const SubmissionsPage: React.FC = () => {
  const submissions = [
    { id: 1, assignment: "Math Assignment 3", date: "2025-10-02", status: "Graded" },
    { id: 2, assignment: "Science Lab Report", date: "2025-10-05", status: "Pending" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Assignment Submissions</h1>
        <p className="text-gray-300 text-lg">Upload your assignments and track submission status.</p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-10 mb-16 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="mb-6 text-center">
          <button className="bg-maroon-700 hover:bg-maroon-800 text-white px-6 py-2 rounded-full inline-flex items-center gap-2 transition">
            <FaUpload /> Upload Submission
          </button>
        </div>

        <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-maroon-700 text-white">
              <th className="py-3 px-4 text-left">Assignment</th>
              <th className="py-3 px-4 text-center">Date Submitted</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr
                key={sub.id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-4">{sub.assignment}</td>
                <td className="py-3 px-4 text-center">{sub.date}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      sub.status === "Graded"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>

      <footer className="bg-black text-gray-300 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Smart Schools System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SubmissionsPage;
