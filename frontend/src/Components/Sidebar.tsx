// src/Components/Sidebar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if user is not authenticated
  const requireLogin = (to: string) => {
    if (!user) {
      navigate("/login", { state: { redirectTo: to } });
      return;
    }
    navigate(to);
  };

  const buttonClass = "w-full text-left py-2 px-3 rounded-full border border-maroon-700 text-maroon-700 font-semibold hover:bg-maroon-700 hover:text-white transition";

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Portals</h3>

      <button onClick={() => requireLogin("/student-centre")} className={buttonClass}>
        Student Centre
      </button>

      <button onClick={() => requireLogin("/teachers-portal")} className={buttonClass}>
        Teachers Portal
      </button>

      <button onClick={() => requireLogin("/parents-portal")} className={buttonClass}>
        Parents Portal
      </button>

      <button onClick={() => requireLogin("/payments")} className={buttonClass}>
        Payments
      </button>

      {/* Notice Board is always accessible */}
      <Link
        to="/notice-board"
        className={buttonClass}
      >
        Notice Board
      </Link>
    </aside>
  );
};

export default Sidebar;
