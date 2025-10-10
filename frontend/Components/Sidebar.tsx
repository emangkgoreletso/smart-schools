import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  User,
  Users,
  CreditCard,
  LogOut,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import { getUserRole, logout } from "../Utils/auth";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-[#800000] text-white flex flex-col justify-between transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>SmartSchools</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white"
          >
            ☰
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col mt-4 space-y-2">
          <SidebarLink to="/dashboard" icon={<Home size={20} />} label="Dashboard" open={isOpen} />

          {role === "student" && (
            <>
              <SidebarLink
                to="/student"
                icon={<GraduationCap size={20} />}
                label="Student Centre"
                open={isOpen}
              />
              <SidebarLink
                to="/assignments"
                icon={<BookOpen size={20} />}
                label="Assignments"
                open={isOpen}
              />
              <SidebarLink
                to="/tests"
                icon={<ClipboardList size={20} />}
                label="Tests"
                open={isOpen}
              />
              <SidebarLink
                to="/submissions"
                icon={<FileText size={20} />}
                label="Submissions"
                open={isOpen}
              />
            </>
          )}

          {role === "teacher" && (
            <>
              <SidebarLink
                to="/teachers"
                icon={<Users size={20} />}
                label="Teacher Portal"
                open={isOpen}
              />
              <SidebarLink
                to="/assignments"
                icon={<BookOpen size={20} />}
                label="Assignments"
                open={isOpen}
              />
              <SidebarLink
                to="/tests"
                icon={<ClipboardList size={20} />}
                label="Tests"
                open={isOpen}
              />
              <SidebarLink
                to="/reports"
                icon={<FileText size={20} />}
                label="Reports"
                open={isOpen}
              />
            </>
          )}

          {role === "parent" && (
            <>
              <SidebarLink
                to="/parents"
                icon={<User size={20} />}
                label="Parent Portal"
                open={isOpen}
              />
              <SidebarLink
                to="/payments"
                icon={<CreditCard size={20} />}
                label="Payments"
                open={isOpen}
              />
              <SidebarLink
                to="/reports"
                icon={<FileText size={20} />}
                label="Reports"
                open={isOpen}
              />
            </>
          )}

          {role === "admin" && (
            <>
              <SidebarLink
                to="/admissions"
                icon={<Users size={20} />}
                label="Admissions"
                open={isOpen}
              />
              <SidebarLink
                to="/payments"
                icon={<CreditCard size={20} />}
                label="Payments"
                open={isOpen}
              />
              <SidebarLink
                to="/reports"
                icon={<FileText size={20} />}
                label="Reports"
                open={isOpen}
              />
            </>
          )}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full text-gray-300 hover:text-white"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

// ✅ Reusable Sidebar Link Component
interface SidebarLinkProps {
  to: string;
  icon: JSX.Element;
  label: string;
  open: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, open }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 py-2 px-4 hover:bg-[#A52A2A] rounded-md transition"
  >
    {icon}
    {open && <span>{label}</span>}
  </Link>
);

export default Sidebar;
