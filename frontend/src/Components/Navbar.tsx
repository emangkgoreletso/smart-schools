import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole, logout } from "../Utils/Auth";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const role = getUserRole(); // e.g., "student", "teacher", "parent", "admin"

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          SmartSchools
        </Link>

        {/* Navigation Links */}
        {loggedIn && (
          <ul className="flex space-x-6 text-sm md:text-base">
            {/* Common Links */}
            <li>
              <Link to="/dashboard" className="hover:text-yellow-300 transition">
                Dashboard
              </Link>
            </li>

            {/* Role-Specific Links */}
            {role === "student" && (
              <>
                <li>
                  <Link to="/student" className="hover:text-yellow-300 transition">
                    Student Center
                  </Link>
                </li>
                <li>
                  <Link to="/assignments" className="hover:text-yellow-300 transition">
                    Assignments
                  </Link>
                </li>
                <li>
                  <Link to="/tests" className="hover:text-yellow-300 transition">
                    Tests
                  </Link>
                </li>
                <li>
                  <Link to="/submissions" className="hover:text-yellow-300 transition">
                    Submissions
                  </Link>
                </li>
              </>
            )}

            {role === "teacher" && (
              <>
                <li>
                  <Link to="/teachers" className="hover:text-yellow-300 transition">
                    Teacher Portal
                  </Link>
                </li>
                <li>
                  <Link to="/assignments" className="hover:text-yellow-300 transition">
                    Assignments
                  </Link>
                </li>
                <li>
                  <Link to="/tests" className="hover:text-yellow-300 transition">
                    Tests
                  </Link>
                </li>
                <li>
                  <Link to="/reports" className="hover:text-yellow-300 transition">
                    Reports
                  </Link>
                </li>
              </>
            )}

            {role === "parent" && (
              <>
                <li>
                  <Link to="/parents" className="hover:text-yellow-300 transition">
                    Parent Portal
                  </Link>
                </li>
                <li>
                  <Link to="/payments" className="hover:text-yellow-300 transition">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link to="/reports" className="hover:text-yellow-300 transition">
                    Reports
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link to="/admissions" className="hover:text-yellow-300 transition">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link to="/payments" className="hover:text-yellow-300 transition">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link to="/reports" className="hover:text-yellow-300 transition">
                    Reports
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-yellow-400 text-blue-900 px-4 py-1 rounded hover:bg-yellow-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-400 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
