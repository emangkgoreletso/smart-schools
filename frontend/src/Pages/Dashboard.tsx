import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaBookOpen,
  FaCalendarAlt,
  FaBullhorn,
  FaCog,
} from "react-icons/fa";

interface User {
  name: string;
  role: "student" | "teacher" | "parent" | "admin";
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [termStats, setTermStats] = useState({
    currentTerm: "Term 3, 2025",
    totalCourses: 0,
    pendingAssignments: 0,
    announcements: 0,
  });

  useEffect(() => {
    // TODO: Replace this with actual authentication context or API call
    const loggedUser = {
      name: "Emang Kgoreletso",
      role: "teacher" as const,
    };
    setUser(loggedUser);

    // Example term stats
    setTermStats({
      currentTerm: "Term 3, 2025",
      totalCourses: 5,
      pendingAssignments: 3,
      announcements: 2,
    });
  }, []);

  const roleBasedActions = {
    student: [
      { icon: <FaBookOpen />, title: "My Courses", link: "/student-center" },
      { icon: <FaClipboardList />, title: "Assignments", link: "/assignments" },
      { icon: <FaMoneyBillWave />, title: "Payments", link: "/payments" },
      { icon: <FaBullhorn />, title: "Announcements", link: "/notices" },
    ],
    teacher: [
      { icon: <FaClipboardList />, title: "Manage Assignments", link: "/teachers-portal" },
      { icon: <FaUsers />, title: "Class Management", link: "/classes" },
      { icon: <FaCalendarAlt />, title: "Schedule Meetings", link: "/meetings" },
      { icon: <FaBullhorn />, title: "Post Notice", link: "/announcements" },
    ],
    parent: [
      { icon: <FaUserGraduate />, title: "Child Performance", link: "/progress" },
      { icon: <FaMoneyBillWave />, title: "Payments & Invoices", link: "/payments" },
      { icon: <FaCalendarAlt />, title: "Upcoming Meetings", link: "/meetings" },
      { icon: <FaBullhorn />, title: "School Notices", link: "/notices" },
    ],
    admin: [
      { icon: <FaUsers />, title: "User Management", link: "/admin/users" },
      { icon: <FaBookOpen />, title: "Course Control", link: "/admin/courses" },
      { icon: <FaMoneyBillWave />, title: "Finance Reports", link: "/admin/payments" },
      { icon: <FaCog />, title: "System Settings", link: "/admin/settings" },
    ],
  };

  if (!user) return <div className="text-center py-20 text-gray-600">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-gray-300 text-lg mt-2 capitalize">
          {user.role} Dashboard — Smart Schools System
        </p>
      </header>

      {/* Term Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-8 py-10">
        <DashboardStat title="Current Term" value={termStats.currentTerm} />
        <DashboardStat title="Total Courses" value={termStats.totalCourses.toString()} />
        <DashboardStat title="Pending Assignments" value={termStats.pendingAssignments.toString()} />
        <DashboardStat title="Announcements" value={termStats.announcements.toString()} />
      </section>

      {/* Role-based Actions */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-maroon-700 dark:text-maroon-500">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roleBasedActions[user.role].map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={action.link}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-all"
              >
                <div className="text-maroon-700 dark:text-maroon-500 text-4xl mb-3">
                  {action.icon}
                </div>
                <p className="font-semibold">{action.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-6 text-center mt-10">
        <p>© {new Date().getFullYear()} Smart Schools — Dashboard</p>
      </footer>
    </div>
  );
};

interface DashboardStatProps {
  title: string;
  value: string;
}

const DashboardStat: React.FC<DashboardStatProps> = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition"
  >
    <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
    <h3 className="text-2xl font-bold text-maroon-700 dark:text-maroon-500 mt-2">{value}</h3>
  </motion.div>
);

export default Dashboard;
