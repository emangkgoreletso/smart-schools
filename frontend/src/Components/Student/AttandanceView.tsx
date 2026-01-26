import React from "react";

interface AttendanceRecord {
  id: string;
  subject: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const AttendanceView: React.FC = () => {
  const records: AttendanceRecord[] = [
    { id: "1", subject: "Mathematics", date: "2026-01-10", status: "Present" },
    { id: "2", subject: "English", date: "2026-01-09", status: "Late" },
    { id: "3", subject: "Physics", date: "2026-01-08", status: "Absent" },
  ];

  const statusColor = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "Present":
        return "text-green-600";
      case "Late":
        return "text-yellow-600";
      case "Absent":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Attendance History</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Subject</th>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b last:border-0">
              <td className="py-2">{r.subject}</td>
              <td className="py-2">{r.date}</td>
              <td className={`py-2 font-medium ${statusColor(r.status)}`}>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {records.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No attendance records available.
        </p>
      )}
    </div>
  );
};

export default AttendanceView;