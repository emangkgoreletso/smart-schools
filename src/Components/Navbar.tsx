// src/Components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (!user) {
      navigate("/login", { state: { redirectTo: "/dashboard" } });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <nav className="w-full bg-maroon-700 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">Smart School System</div>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/about" className="hover:text-gray-200">About Us</Link>
        <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>

        <button
          onClick={handleDashboardClick}
          className="bg-white text-maroon-700 px-4 py-2 href=./dashboard rounded-full font-semibold hover:bg-gray-100"
        >
          Dashboard
        </button>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-maroon-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => { signOut(); navigate("/"); }}
            className="flex items-center gap-3 bg-white text-maroon-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            {/* Profile Icon */}
            <span className="w-8 h-8 rounded-full bg-maroon-700 text-white flex items-center justify-center">
              {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
            </span>

            {/* Logout Text */}
            <span>
              Logout
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
