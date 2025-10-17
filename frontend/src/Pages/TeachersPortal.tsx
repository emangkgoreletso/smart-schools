import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaUsers,
  FaUserCheck,
  FaBullhorn,
  FaEnvelope,
  FaFileUpload,
  FaCalendarAlt,
  FaComments,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

const TeachersPortal: React.FC = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Staff Meeting on Wednesday",
      date: "2025-10-08",
      details:
        "All teachers are required to attend the weekly coordination meeting at 3 PM in the Staff Room.",
    },
    {
      id: 2,
      title: "Performance Appraisal Due",
      date: "2025-10-04",
      details: "Submit your self-evaluation forms by Friday.",
    },
    {
      id: 3,
      title: "Exam Timetable Finalization",
      date: "2025-10-02",
      details: "Confirm your subject exam slots and update student readiness status.",
    },
  ]);

  // Teacher dashboard modules
  const teacherModules = [
    {
      icon: <FaClipboardList />,
      title: "Assignments & Tests",
      description: "Create, edit, and review student assignments and tests.",
      link: "/assignments",
    },
    {
      icon: <FaFileUpload />,
      title: "Upload Materials",
      description: "Upload study materials, slides, and resources for your students.",
      link: "/materials",
    },
    {
      icon: <FaUserCheck />,
      title: "Attendance",
      description: "Mark daily attendance and track participation per subject.",
      link: "/attendance",
    },
    {
      icon: <FaUsers />,
      title: "Class Roles & Mentorship",
      description: "Assign class captains or monitor student leadership roles.",
      link: "/class-roles",
    },
    {
      icon: <FaBullhorn />,
      title: "Notice Board",
      description: "Post school or class announcements and reminders.",
      link: "/notices",
    },
    {
      icon: <FaEnvelope />,
      title: "Messaging",
      description: "Send notifications to students or parents directly.",
      link: "/messages",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Parent Meetings",
      description: "Schedule or join online/physical meetings with parents.",
      link: "/meetings",
    },
    {
      icon: <FaChartLine />,
      title: "Reports & Appraisals",
      description: "Upload termly reports, grade summaries, and performance reviews.",
      link: "/reports",
    },
    {
      icon: <FaComments />,
      title: "Class Discussions",
      description: "Join and moderate your class discussions and forums.",
      link: "/discussions",
    },
    {
      icon: <FaStar />,
      title: "Student Progress",
      description: "View analytics and track learning progress.",
      link: "/progress",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-8 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Teachers Portal</h1>
        <p className="text-gray-300 text-lg">
          Manage your classroom, communicate effectively, and monitor student success.
        </p>
      </header>

      {/* Notice Board */}
      <section className="max-w-5xl mx-auto mt-10 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between bg-maroon-700 text-white px-6 py-3">
          <div className="flex items-center gap-2">
            <FaBullhorn className="text-yellow-400" />
            <h2 className="text-lg font-semibold">Notice Board</h2>
          </div>
          <span className="text-sm opacity-80">Latest staff announcements</span>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {notices.map((notice) => (
            <li
              key={notice.id}
              className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-maroon-700 dark:text-maroon-400">
                  {notice.title}
                </h3>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{notice.details}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Dashboard Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-6">
        {teacherModules.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 hover:-translate-y-2 transition-all"
          >
            <div className="text-maroon-700 dark:text-maroon-600 text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-4">{item.description}</p>
            <Link
              to={item.link}
              className="bg-maroon-700 hover:bg-maroon-800 text-white px-4 py-2 rounded-full transition"
            >
              Open
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Smart Schools System — Teachers Portal</p>
      </footer>
    </div>
  );
};

export default TeachersPortal;
