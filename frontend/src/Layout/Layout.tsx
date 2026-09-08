// src/Layout/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom"; // <Outlet> renders child routes
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar always visible */}
        <Sidebar />

        {/* Main content from child routes */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
