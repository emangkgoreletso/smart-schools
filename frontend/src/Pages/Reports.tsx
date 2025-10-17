import React from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaDownload } from "react-icons/fa";

const Reports: React.FC = () => {
  const reports = [
    { id: 1, title: "Term 1 Progress Report", date: "2025-03-30", file: "/reports/term1.pdf" },
    { id: 2, title: "Term 2 Progress Report", date: "2025-07-28", file: "/reports/term2.pdf" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Reports & Appraisals</h1>
        <p className="text-gray-300 text-lg">Download your academic progress reports securely.</p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-10 mb-16 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-maroon-700 text-white">
              <th className="py-3 px-4 text-left">Report</th>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <FaFileAlt className="text-maroon-600" />
                  {report.title}
                </td>
                <td className="py-3 px-4 text-center">{report.date}</td>
                <td className="py-3 px-4 text-center">
                  <a
                    href={report.file}
                    className="bg-maroon-700 hover:bg-maroon-800 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 transition"
                    download
                  >
                    <FaDownload /> Download
                  </a>
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

export default Reports;
