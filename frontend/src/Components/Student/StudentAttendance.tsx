import React from "react";

/* =========================================
TYPES
========================================= */

import { AttendanceRecord } from "../../Domain/LMS";
interface Props {
  records: AttendanceRecord[];
}

/* =========================================
HELPERS
========================================= */

const colorByStatus = (status: string) => {
  if (status === "Present") return "text-green-600";
  if (status === "Late") return "text-yellow-600";
  return "text-red-600";
};

/* =========================================
COMPONENT
========================================= */

const StudentAttendance: React.FC<Props> = ({ records }) => {

  const total = records.length;

  const present = records.filter(r => r.status === "Present").length;

  const percentage =
    total === 0 ? 0 : Math.round((present / total) * 100);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Attendance
        </h2>

        <p className="text-sm text-gray-600">
          Your attendance record for this subject
        </p>
      </div>

      {/* SUMMARY */}
      <div className="border rounded-lg p-4 text-center">

        <p className="text-sm text-gray-500">
          Attendance Rate
        </p>

        <p className="text-3xl font-bold text-maroon-700">
          {percentage}%
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {present} of {total} classes attended
        </p>

      </div>

      {/* RECORD TABLE */}
      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-maroon-700 mb-3">
          Attendance History
        </h3>

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>

            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="text-center text-gray-500 p-4"
                >
                  No attendance records available
                </td>
              </tr>
            ) : (
              records.map((r, index) => (
                <tr key={index} className="border-t">

                  <td className="p-2">
                    {r.date}
                  </td>

                  <td className={`p-2 font-medium ${colorByStatus(r.status)}`}>
                    {r.status}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default StudentAttendance;