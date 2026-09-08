import React, { useState } from "react";
import ParentAbsenceRequest from "./ParentAbsenceRequest";

interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent" | "Late";
}

interface Props {
  studentId: string;
}

const ParentAttendance: React.FC<Props> = ({ studentId }) => {
  const [records] = useState<AttendanceRecord[]>([
    { date: "2026-04-20", status: "Present" },
    { date: "2026-04-21", status: "Present" },
    { date: "2026-04-22", status: "Absent" },
    { date: "2026-04-23", status: "Late" }
  ]);

  const [showRequest, setShowRequest] = useState(false);

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-maroon-700">
        Attendance Record
      </h2>

      <button
        onClick={() => setShowRequest(true)}
        className="bg-maroon-700 text-white px-4 py-2 rounded"
      >
        Request Absence
      </button>

      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.date}</td>
              <td className="p-2">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showRequest && (
        <ParentAbsenceRequest
          studentId={studentId}
          onClose={() => setShowRequest(false)}
        />
      )}

    </div>
  );
};

export default ParentAttendance;