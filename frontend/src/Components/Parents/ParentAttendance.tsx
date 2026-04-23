import React from "react";

interface Props {
  childId: string;
}

const ParentAttendance: React.FC<Props> = ({ childId }) => {

  const records = [
    { date: "2026-04-01", status: "Present" },
    { date: "2026-04-03", status: "Present" },
    { date: "2026-04-05", status: "Absent" },
  ];

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold text-maroon-700">
        Attendance Record
      </h3>

      <table className="w-full border rounded-lg overflow-hidden">

        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 text-sm">Date</th>
            <th className="text-left p-3 text-sm">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-3 text-sm">{r.date}</td>
              <td className="p-3 text-sm">

                <span
                  className={`px-2 py-1 text-xs rounded
                    ${
                      r.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {r.status}
                </span>

              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default ParentAttendance;