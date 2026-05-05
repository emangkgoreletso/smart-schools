import React, { useMemo, useState } from "react";

import ParentOverview from "./ParentOverview";
import ParentAttendance from "./ParentAttendance";
import ParentPerformance from "./ParentPerformance";
import ParentPayments from "./ParentPayments";
import ParentAnnouncements from "./ParentAnnouncements";
import ParentMessages from "./ParentMessages";
import ParentMeetings from "./ParentMeetings";

/* ================================
TYPES
================================ */

interface Student {
  id: string;
  name: string;
  className: string;
}

interface Props {
  students: Student[];
}

/* ================================
TABS
================================ */

type Tab =
  | "Overview"
  | "Performance"
  | "Attendance"
  | "Payments"
  | "Announcements"
  | "Messages"
  | "Meetings";

/* ================================
COMPONENT
================================ */

const ParentStudentShell: React.FC<Props> = ({ students }) => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [selectedStudent, setSelectedStudent] = useState<Student>(
    students[0]
  );

  /* ================================
  DERIVED DATA
  ================================= */

  const studentLabel = useMemo(
    () => `${selectedStudent.name} • ${selectedStudent.className}`,
    [selectedStudent]
  );

  /* ================================
  UI
  ================================= */

  return (
    <div className="space-y-6">

      {/* ================================
      HEADER
      ================================= */}

      <div className="bg-white p-5 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-maroon-700">
            My Children
          </h1>

          <p className="text-sm text-gray-500">
            Viewing student: {studentLabel}
          </p>
        </div>

        {/* STUDENT SELECTOR */}

        {students.length > 1 && (
          <select
            value={selectedStudent.id}
            onChange={(e) =>
              setSelectedStudent(
                students.find((s) => s.id === e.target.value)!
              )
            }
            className="border px-3 py-2 rounded text-sm"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} • {s.className}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ================================
      NAVIGATION
      ================================= */}

      <div className="flex flex-wrap gap-3">

        {(
          [
            "Overview",
            "Performance",
            "Attendance",
            "Payments",
            "Announcements",
            "Messages",
            "Meetings",
          ] as Tab[]
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border text-sm transition
            ${
              activeTab === tab
                ? "bg-maroon-700 text-white border-maroon-700"
                : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* ================================
      CONTENT
      ================================= */}

      <div className="bg-white p-6 rounded-lg shadow">

        {/* OVERVIEW */}

        {activeTab === "Overview" && (
          <ParentOverview
            studentId={selectedStudent.id}
            studentName={selectedStudent.name}
            className={selectedStudent.className}
          />
        )}

        {/* PERFORMANCE */}

        {activeTab === "Performance" && (
          <ParentPerformance
            studentId={selectedStudent.id}
          />
        )}

        {/* ATTENDANCE */}

        {activeTab === "Attendance" && (
          <ParentAttendance
            studentId={selectedStudent.id}
          />
        )}

        {/* PAYMENTS */}

        {activeTab === "Payments" && (
          <ParentPayments
            studentId={selectedStudent.id}
          />
        )}

        {/* ANNOUNCEMENTS */}

        {activeTab === "Announcements" && (
          <ParentAnnouncements
            studentId={selectedStudent.id}
          />
        )}

        {/* MESSAGES */}

        {activeTab === "Messages" && (
          <ParentMessages
            studentId={selectedStudent.id}
          />
        )}

        {/* MEETINGS */}

        {activeTab === "Meetings" && (
          <ParentMeetings
            studentId={selectedStudent.id}
          />
        )}

      </div>

    </div>
  );
};

export default ParentStudentShell;