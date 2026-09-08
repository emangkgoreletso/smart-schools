import React from "react";

/* =========================
TYPES
========================= */

interface Student {
  id: string;
  name: string;
  admission: string;
}

interface Props {
  student: Student;
  onClose: () => void;
}

/* =========================
COMPONENT
========================= */

const StudentProfileDrawer: React.FC<Props> = ({
  student,
  onClose,
}) => {
  return (
    <div className="fixed right-0 top-0 w-[400px] h-full bg-white shadow-xl p-5 z-50 overflow-y-auto">

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="text-sm text-maroon-700 mb-4"
      >
        ← Close
      </button>

      {/* HEADER */}
      <div className="border-b pb-4 mb-4">

        <h2 className="text-xl font-bold text-maroon-700">
          {student.name}
        </h2>

        <p className="text-sm text-gray-500">
          {student.admission}
        </p>

      </div>

      {/* SUMMARY */}
      <div className="space-y-4">

        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Class Average</p>
          <p className="text-lg font-bold">78%</p>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Rank</p>
          <p className="text-lg font-bold">#2</p>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Attendance</p>
          <p className="text-lg font-bold">92%</p>
        </div>

      </div>

      {/* PERFORMANCE */}
      <div className="mt-6">

        <h3 className="font-semibold text-maroon-700 mb-2">
          Performance Breakdown
        </h3>

        <ul className="text-sm space-y-2">

          <li className="flex justify-between border-b py-1">
            Assignment Avg <span>75%</span>
          </li>

          <li className="flex justify-between border-b py-1">
            Quiz Avg <span>80%</span>
          </li>

          <li className="flex justify-between py-1">
            Exam Avg <span>78%</span>
          </li>

        </ul>

      </div>

    </div>
  );
};

export default StudentProfileDrawer;