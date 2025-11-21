import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaClock, FaCheckCircle, FaPlayCircle } from "react-icons/fa";

const TestsPage: React.FC = () => {
  const [tests] = useState([
    {
      id: 1,
      subject: "Mathematics",
      title: "Algebra & Geometry Test",
      duration: "45 mins",
      date: "2025-10-15",
      status: "Upcoming",
    },
    {
      id: 2,
      subject: "Biology",
      title: "Human Anatomy Quiz",
      duration: "30 mins",
      date: "2025-10-10",
      status: "Completed",
    },
    {
      id: 3,
      subject: "Computer Science",
      title: "Programming Basics",
      duration: "60 mins",
      date: "2025-10-12",
      status: "Ongoing",
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Online Tests & Assessments</h1>
        <p className="text-gray-300 text-lg">
          Manage and take your tests seamlessly with real-time tracking and feedback.
        </p>
      </header>

      {/* Test List Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mt-10 mb-16 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <h2 className="text-2xl font-semibold text-maroon-700 mb-6 flex items-center gap-2">
          <FaClipboardList /> Available Tests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-maroon-700 text-white">
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-center">Duration</th>
                <th className="py-3 px-4 text-center">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, i) => (
                <tr
                  key={test.id}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-4">{test.subject}</td>
                  <td className="py-3 px-4">{test.title}</td>
                  <td className="py-3 px-4 text-center">{test.duration}</td>
                  <td className="py-3 px-4 text-center">{test.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        test.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : test.status === "Ongoing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {test.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {test.status === "Upcoming" && (
                      <button className="bg-maroon-700 hover:bg-maroon-800 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 transition">
                        <FaPlayCircle /> Start
                      </button>
                    )}
                    {test.status === "Ongoing" && (
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 transition">
                        <FaClock /> Continue
                      </button>
                    )}
                    {test.status === "Completed" && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 transition">
                        <FaCheckCircle /> View Results
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Smart Schools System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TestsPage;
