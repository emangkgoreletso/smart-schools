import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

const Payments: React.FC = () => {
  const [payments] = useState([
    { id: 1, term: "Term 1", amount: 2500, date: "2025-03-10", status: "Paid" },
    { id: 2, term: "Term 2", amount: 2500, date: "2025-07-15", status: "Pending" },
  ]);

  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalDue = 5000 - totalPaid;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-maroon-700 to-black text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Payments & Fees</h1>
        <p className="text-gray-300 text-lg">
          Manage your tuition and track your payment history.
        </p>
      </header>

      {/* Payment Summary */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-10 mb-16 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-maroon-700 dark:text-maroon-400">
            Payment Summary
          </h2>
          <button className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white px-6 py-2 rounded-full transition">
            <FaCreditCard /> Make Payment
          </button>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-center">
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold">Total Paid</h3>
            <p className="text-3xl font-bold text-green-600">P{totalPaid}</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold">Balance Due</h3>
            <p className="text-3xl font-bold text-red-500">P{totalDue}</p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-maroon-700 text-white">
                <th className="py-3 px-4 text-left">Term</th>
                <th className="py-3 px-4 text-center">Amount</th>
                <th className="py-3 px-4 text-center">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-4">{p.term}</td>
                  <td className="py-3 px-4 text-center">P{p.amount}</td>
                  <td className="py-3 px-4 text-center">{p.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        p.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
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

export default Payments;
