import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const portalButtons = [
    { label: "Student Centre", path: "/student" },
    { label: "Teachers Portal", path: "/teachers" },
    { label: "Parents Portal", path: "/parents" },
    { label: "Payments", path: "/payments" },
    { label: "Finance", path: "/finance" },
    { label: "Admin", path: "/admin" },
    { label: "Super Admin", path: "/super-admin" },

  ];

  const adminButtons =
    user?.role === "admin" || user?.role === "superadmin"
      ? [
          { label: "School Admin", path: "/school-admin" },
          { label: "Super Admin", path: "/super-admin" },
          { label: "Finance / Bursar", path: "/finance" },
        ]
      : [];

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-maroon-700 mb-6">
        System Dashboard
      </h1>

      <p className="mb-6 text-gray-700">
        Choose a portal below to continue.
      </p>

      {/* MAIN PORTALS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {portalButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => navigateTo(btn.path)}
            className="
              w-full py-6 rounded-xl border border-maroon-700 
              text-maroon-700 text-xl font-semibold 
              hover:bg-maroon-700 hover:text-white transition
            "
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ADMIN PORTALS */}
      {adminButtons.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-maroon-700 mb-4">
            Admin Portals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(btn.path)}
                className="
                  w-full py-6 rounded-xl border border-maroon-700 
                  text-maroon-700 text-xl font-semibold 
                  hover:bg-maroon-700 hover:text-white transition
                "
              >
                {btn.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
