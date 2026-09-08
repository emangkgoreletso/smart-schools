import React from "react";
import ParentStudentShell from "../Components/Parents/ParentStudentShell";

/* =========================
TYPES
========================= */

interface Student {
  id: string;
  name: string;
  className: string;
}

/* =========================
COMPONENT
========================= */

const ParentsPortal: React.FC = () => {

  /* TEMPORARY MOCK DATA
     Later this will come from API */
  const students: Student[] = [
    {
      id: "student-1",
      name: "Neo Dlamini",
      className: "Form 3A",
    },

    // Example for multi-child parents
    {
      id: "student-2",
      name: "Amahle Dlamini",
      className: "Form 1B",
    },
  ];

  return (
    <div className="space-y-6 p-6">

      {/* PAGE HEADER */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-maroon-700">
          Parent Portal
        </h1>

        <p className="text-sm text-gray-600">
          Monitor your child's academic progress, attendance, payments, and communication with the school.
        </p>
      </div>

      {/* MAIN SHELL */}
      <ParentStudentShell students={students} />

    </div>
  );
};

export default ParentsPortal;