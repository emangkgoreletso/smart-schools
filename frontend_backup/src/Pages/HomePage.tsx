import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaMoneyBill,
  FaClipboardList,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const HomePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen flex flex-col`}>
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center px-8 py-4 shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold text-maroon-700">Smart Schools</h1>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 border border-gray-400 rounded-xl px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          <span className="hidden sm:inline">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </nav>

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`py-20 text-center ${
          darkMode
            ? "bg-gradient-to-r from-maroon-800 via-black to-gray-900"
            : "bg-gradient-to-r from-maroon-700 via-maroon-900 to-black"
        } text-white`}
      >
        <h1 className="text-5xl font-extrabold mb-4">Smart Schools System</h1>
        <p className="text-lg text-gray-300 mb-6">
          Streamline learning, teaching, and management — all in one platform.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.header>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-12">
        {[
          { title: "Active Students", value: "1,024+" },
          { title: "Courses Available", value: "38" },
          { title: "Assignments Submitted", value: "5,610+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={`p-6 rounded-2xl shadow-md text-center ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border border-gray-200"
            } hover:shadow-xl transition`}
          >
            <h3 className="text-4xl font-bold text-maroon-600">{stat.value}</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300">{stat.title}</p>
          </motion.div>
        ))}
      </section>

      {/* Portals */}
      <section className="flex flex-wrap justify-center gap-10 px-8 py-12 border-t dark:border-gray-700">
        {portalData.map((portal, i) => (
          <motion.div
            key={portal.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <PortalCard darkMode={darkMode} {...portal} />
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className={`py-6 text-center ${darkMode ? "bg-gray-800 text-gray-400" : "bg-black text-gray-300"}`}>
        <p>© {new Date().getFullYear()} Smart Schools System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

interface PortalCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  darkMode: boolean;
}

const PortalCard: React.FC<PortalCardProps> = ({ icon, title, description, link, darkMode }) => (
  <Link
    to={link}
    className={`w-72 rounded-2xl p-6 text-center shadow-sm transition-all transform hover:-translate-y-2 ${
      darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
    }`}
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-300 mb-4">{description}</p>
    <button className="bg-maroon-700 hover:bg-maroon-800 text-white px-4 py-2 rounded-full transition">
      Enter Portal
    </button>
  </Link>
);

const portalData = [
  {
    icon: <FaUserGraduate size={40} className="text-maroon-700" />,
    title: "Student Centre",
    description: "Access your assignments, tests, and results.",
    link: "/student-center",
  },
  {
    icon: <FaChalkboardTeacher size={40} className="text-maroon-700" />,
    title: "Teachers Portal",
    description: "Post assignments and monitor student progress.",
    link: "/teachers-portal",
  },
  {
    icon: <FaUsers size={40} className="text-maroon-700" />,
    title: "Parents Portal",
    description: "Track performance, payments, and updates.",
    link: "/parents-portal",
  },
  {
    icon: <FaMoneyBill size={40} className="text-maroon-700" />,
    title: "Payments",
    description: "Make and manage secure school payments.",
    link: "/payments",
  },
  {
    icon: <FaClipboardList size={40} className="text-maroon-700" />,
    title: "Admissions",
    description: "Apply or transfer students seamlessly online.",
    link: "/admissions",
  },
];

export default HomePage;
