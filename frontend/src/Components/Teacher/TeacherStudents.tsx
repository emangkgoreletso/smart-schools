import React, { useState } from "react";

interface Student {
  id: number;
  name: string;
  admission: string;
  average: number;
  attendance: number;
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Neo Dlamini",
    admission: "SS2024-001",
    average: 78,
    attendance: 94,
  },
  {
    id: 2,
    name: "Naledi Motsamai",
    admission: "SS2024-002",
    average: 82,
    attendance: 96,
  },
  {
    id: 3,
    name: "Thabo Molefe",
    admission: "SS2024-003",
    average: 65,
    attendance: 88,
  },
  {
    id: 4,
    name: "Kabelo Sechele",
    admission: "SS2024-004",
    average: 71,
    attendance: 91,
  },
];

const TeacherStudents: React.FC = () => {
  const [classGroup, setClassGroup] = useState("Form 3A");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-maroon-700">
          👩‍🎓 My Students
        </h2>
        <p className="text-sm text-gray-600">
          View student profiles, performance insights and attendance
        </p>
      </div>

      {/* CLASS FILTER */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center flex-wrap gap-3">

        <div className="flex items-center gap-3">

          <label className="text-sm text-gray-600">
            Class
          </label>

          <select
            value={classGroup}
            onChange={(e) => setClassGroup(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>Form 3A</option>
            <option>Form 3B</option>
            <option>Form 4A</option>
          </select>

        </div>

        <div className="text-sm text-gray-500">
          {mockStudents.length} Students
        </div>

      </div>

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Admission No.</th>
              <th className="p-3 text-left">Average</th>
              <th className="p-3 text-left">Attendance</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {mockStudents.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium">
                  student.fullName OR `${student.name} ${student.name}` ✅
                </td>

                <td className="p-3 text-gray-600">
                  {student.admission}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        student.average >= 75
                          ? "bg-green-100 text-green-700"
                          : student.average >= 60
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {student.average}%
                  </span>
                </td>

                <td className="p-3">
                  <span className="text-gray-700">
                    {student.attendance}%
                  </span>
                </td>

                <td className="p-3 flex gap-2">

                  <button className="px-3 py-1 text-xs rounded-full border border-maroon-700 text-maroon-700 hover:bg-maroon-50">
                    View Profile
                  </button>

                  <button className="px-3 py-1 text-xs rounded-full border border-maroon-700 text-maroon-700 hover:bg-maroon-50">
                    Performance
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TeacherStudents;