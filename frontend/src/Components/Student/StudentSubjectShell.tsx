import React, { useState } from "react";

import StudentSubjectOverview from "./StudentSubjectOverview";
import StudentMaterials from "./StudentMaterials";
import StudentAssignments from "./Assessment/StudentAssignments";
import StudentTests from "./Assessment/StudentTests";
import StudentDiscussions from "./StudentDiscussions";
import StudentAttendance from "./StudentAttendance";
import StudentNotifications from "./StudentNotifications";

/* =========================
DOMAIN TYPES
========================= */

import {
  Subject,
  Discussion,
  AttendanceRecord,
  StudentPerformance,
} from "../../Domain/LMS";


/* ================= TYPES ================= */

interface SubjectStats {
  materialsCount: number;
  discussionsCount: number;
  assignmentsCount: number;
  testsCount: number;
  attendanceRate: number;
  progress: number;
}

interface Props {
  subject: Subject;
  onBack: () => void;
}

type Tab =
  | "Overview"
  | "Materials"
  | "Assignments"
  | "Tests"
  | "Discussions"
  | "Attendance"
  | "Notifications";

/* ================= COMPONENT ================= */

const StudentSubjectShell: React.FC<Props> = ({ subject, onBack }) => {

  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  /* ================= MOCK DATA ================= */

  const stats: SubjectStats = {
    materialsCount: 12,
    discussionsCount: 5,
    assignmentsCount: 4,
    testsCount: 2,
    attendanceRate: 92,
    progress: 68,
  };

  const discussions: Discussion[] = [
    {
      id: "1",
      subjectId: subject.id,
      title: "Limits Discussion",
      message: "Let’s revise limits step-by-step",
      author: "Teacher",
      createdAt: "2026-04-10",
      visibleToClasses: ["Form 3A"],
      replies: [],
      pinned: true,
    },
    {
      id: "2",
      subjectId: subject.id,
      title: "Homework Help",
      message: "Need help with quadratic equations",
      author: "Student",
      createdAt: "2026-04-11",
      visibleToClasses: ["Form 3A"],
      replies: [],
    },
  ];

  const attendance: AttendanceRecord[] = [
    { id: "att-1", subjectId: subject.id, studentId: "student-1", date: "2026-04-01", status: "Present" },
    { id: "att-2", subjectId: subject.id, studentId: "student-1", date: "2026-04-03", status: "Present" },
    { id: "att-3", subjectId: subject.id, studentId: "student-1", date: "2026-04-05", status: "Absent" },
  ];

  const performance: StudentPerformance = {
    studentId: "student-1",
    subjectId: subject.id,
    overallAverage: 72,
    assignmentAverage: 75,
    testAverage: 68,
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-sm text-maroon-700 hover:underline"
      >
        ← Back to Subjects
      </button>

      {/* HEADER */}
      <div className="bg-white p-5 rounded-lg shadow">

        <h2 className="text-2xl font-bold text-maroon-700">
          {subject.name}
        </h2>

        <p className="text-sm text-gray-600">
          Teacher: {subject.teacher}
        </p>

      </div>

      {/* NAVIGATION */}
      <div className="flex flex-wrap gap-3">

        {(
          [
            "Overview",
            "Materials",
            "Assignments",
            "Tests",
            "Discussions",
            "Attendance",
            "Notifications",

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

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-lg shadow">

        {activeTab === "Overview" && (
          <StudentSubjectOverview
            subject={subject}
            stats={stats}
            studentPerformance={performance}
          />
        )}

        {activeTab === "Materials" && (
          <StudentMaterials
            subjectId={subject.id}
            studentClass="Form 3A"
          />
        )}

        {activeTab === "Assignments" && (
          <StudentAssignments
            subjectId={subject.id}
            studentId="student-1"
          />
        )}

        {activeTab === "Tests" && (
          <StudentTests
            subjectId={subject.id}
            studentId="student-1"
          />
        )}

        {activeTab === "Discussions" && (
          <StudentDiscussions
          subjectId={subject.id}
          />
          )}

        {activeTab === "Attendance" && (
          <StudentAttendance
            records={attendance}
          />
        )}

      {activeTab === "Notifications" && (
         <StudentNotifications
          notifications={[]}
          />
          )}
      </div>

    </div>
  );
};

export default StudentSubjectShell;