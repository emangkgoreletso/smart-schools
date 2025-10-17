import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaCheckCircle } from "react-icons/fa";

const Admission: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-2">Student Admission</h1>
        <p>Apply for new admission or transfer easily online.</p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
            />
            <input
              type="text"
              placeholder="Previous School (if any)"
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
            />
            <textarea
              placeholder="Why do you want to join this school?"
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
            ></textarea>
            <button
              type="submit"
              className="bg-maroon-700 hover:bg-maroon-800 text-white rounded-lg py-3 font-semibold transition"
            >
              Submit Application
            </button>
          </form>
        ) : (
          <div className="text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Application Submitted!</h2>
            <p className="text-gray-500 mt-2">
              We’ll notify you via email about your admission status.
            </p>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Admission;
