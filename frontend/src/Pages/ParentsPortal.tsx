import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBell,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaClipboardList,
  FaUserGraduate,
  FaExchangeAlt,
  FaEnvelopeOpenText,
  FaComments,
  FaBook,
  FaFileDownload,
  FaChartLine,
} from "react-icons/fa";

const ParentsPortal: React.FC = () => {
  const [announcements] = useState([
    {
      id: 1,
      title: "Mid-Term Break Notification",
      date: "2025-10-10",
      details: "School will be closed from October 10–14 for mid-term break.",
    },
    {
      id: 2,
      title: "Parent–Teacher Conference",
      date: "2025-10-15",
      details: "Scheduled for next week, please confirm your meeting slot.",
    },
    {
      id: 3,
      title: "Report Cards Available",
      date: "2025-10-05",
      details: "Termly report cards are now ready for download in your dashboard.",
    },
  ]);

  const parentModules = [
    {
      icon: <FaBell />,
      title: "Notifications",
      description: "Stay updated on assignments, tests, and school alerts.",
      link: "/notifications",
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: "Payment History",
      description: "View all payments, receipts, and pending balances.",
      link: "/payments",
    },
    {
      icon: <FaChartLine />,
      title: "Academic Progress",
      description: "Monitor your child’s grades, results, and overall performance.",
      link: "/progress",
    },
    {
      icon: <FaCalendarAlt />,
      title: "School Calendar & Timetable",
      description: "Keep track of school events, class schedules, and term dates.",
      link: "/calendar",
    },
    {
      icon: <FaBook />,
      title: "Subjects & Courses",
      description: "View your child’s enrolled subjects and resources.",
      link: "/courses",
    },
    {
      icon: <FaFileDownload />,
      title: "Reports & Documents",
      description: "Download student reports, invoices, and notices.",
      link: "/reports",
    },
    {
      icon: <FaComments />,
      title: "Parent–Teacher Meetings",
      description: "Accept or schedule consultations with teachers.",
      link: "/meetings",
    },
    {
      icon: <FaEnvelopeOpenText />,
      title: "Messages",
      description: "Receive messages from school or teachers directly.",
      link: "/messages",
    },
    {
      icon: <FaExchangeAlt />,
      title: "Transfer Requests",
      description: "Apply for inter-school or class transfers.",
      link: "/transfers",
    },
    {
      icon: <FaClipboardList />,
      title: "Assignments & Tests",
      description: "Get notified about your child’s ongoing academic tasks.",
      link: "/assignments",
    },
    {
      icon: <FaUserGraduate />,
      title: "Student Information",
      description: "Access student details, attendance, and class placement.",
      link: "/student-info",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-8 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Parents Portal</h1>
        <p className="text-gray-300 text-lg">
          Stay connected to your child’s education and school activities.
        </p>
      </header>

      {/* Announcement Board */}
      <section className="max-w-5xl mx-auto mt-10 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between bg-maroon-700 text-white px-6 py-3">
          <div className="flex items-center gap-2">
            <FaBell className="text-yellow-400" />
            <h2 className="text-lg font-semibold">Announcements & Updates</h2>
          </div>
          <span className="text-sm opacity-80">Latest from the school</span>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {announcements.map((note) => (
            <li
              key={note.id}
              className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-maroon-700 dark:text-maroon-400">
                  {note.title}
                </h3>
                <span className="text-sm text-gray-500">{note.date}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{note.details}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Dashboard Modules */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-6">
        {parentModules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 hover:-translate-y-2 transition-all"
          >
            <div className="text-maroon-700 dark:text-maroon-600 text-4xl mb-4">{module.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-4">{module.description}</p>
            <Link
              to={module.link}
              className="bg-maroon-700 hover:bg-maroon-800 text-white px-4 py-2 rounded-full transition"
            >
              Open
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Smart Schools System — Parents Portal</p>
      </footer>
    </div>
  );
};

export default ParentsPortal;
