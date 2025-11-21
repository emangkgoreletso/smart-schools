import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaFileDownload,
  FaClipboardList,
  FaUpload,
  FaComments,
  FaChartBar,
  FaMoneyBillWave,
  FaBullhorn,
  FaCalendarCheck,
  FaEnvelope,
} from "react-icons/fa";

const StudentCentre: React.FC = () => {
  const [studentName, setStudentName] = useState("Student");
  const [unreadNotices, setUnreadNotices] = useState(2);
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Midterm Exams Begin Next Week",
      date: "2025-10-10",
      details: "All students must check their exam timetables on the Tests page.",
    },
    {
      id: 2,
      title: "Assignment 3 Posted in Mathematics",
      date: "2025-10-05",
      details: "Deadline for submission is October 15, 2025.",
    },
    {
      id: 3,
      title: "Campus Maintenance Notice",
      date: "2025-10-03",
      details: "Internet will be offline for maintenance from 7–9 PM this Friday.",
    },
  ]);

  const isTertiaryStudent = true; // Temporary, later detect from role

  const cards = [
    {
      icon: <FaBook />,
      title: "My Subjects",
      description: "View your enrolled courses and class schedules.",
      link: "/subjects",
    },
    {
      icon: <FaFileDownload />,
      title: "Study Materials",
      description: "Download lecture notes and study resources.",
      link: "/materials",
    },
    {
      icon: <FaClipboardList />,
      title: "Assignments",
      description: "View and complete your pending assignments.",
      link: "/assignments",
    },
    {
      icon: <FaUpload />,
      title: "Submissions",
      description: "Upload your completed assignments here.",
      link: "/submissions",
    },
    {
      icon: <FaChartBar />,
      title: "Results & Tests",
      description: "View your test results and academic performance.",
      link: "/test-results",
    },
    {
      icon: <FaComments />,
      title: "Class Discussions",
      description: "Join class discussions and collaborate with peers.",
      link: "/discussions",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Attendance",
      description: "Track your daily and term attendance record.",
      link: "/attendance",
    },
    {
      icon: <FaEnvelope />,
      title: "Messages & Notifications",
      description: "Check messages from teachers and the school.",
      link: "/notifications",
    },
  ];

  if (isTertiaryStudent) {
    cards.push({
      icon: <FaMoneyBillWave />,
      title: "Payments",
      description: "Check your tuition and payment history.",
      link: "/payments",
    });
  }

  useEffect(() => {
    // TODO: Fetch logged-in student info later from backend
    const name = localStorage.getItem("studentName") || "Student";
    setStudentName(name);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-8 shadow-md text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome, {studentName} 👋</h1>
        <p className="text-gray-300 text-lg">
          Manage your learning, assignments, tests, and school updates in one place.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          You have <span className="text-yellow-400 font-semibold">{unreadNotices}</span> new notices today.
        </p>
      </header>

      {/* Notice Board */}
      <section
        aria-label="Notice Board"
        className="max-w-5xl mx-auto mt-10 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="flex items-center justify-between bg-maroon-700 text-white px-6 py-3">
          <div className="flex items-center gap-2">
            <FaBullhorn className="text-yellow-400" />
            <h2 className="text-lg font-semibold">Notice Board</h2>
          </div>
          <span className="text-sm opacity-80">Stay informed with the latest updates</span>
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

      {/* Dashboard Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-6">
        {cards.map((item, index) => (
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
    </div>
  );
};

export default StudentCentre;
