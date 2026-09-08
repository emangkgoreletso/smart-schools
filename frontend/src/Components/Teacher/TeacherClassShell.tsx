import React, { useState } from "react";
import StudentProfileDrawer from "./StudentProfileDrawer";
import TeacherTimetable from "./TeacherTimetable";
import TeacherReports from "./TeacherReports";
import ClassGradebook from "./ClassGradebook";

/* =========================
TYPES
========================= */

interface Props {
  subjectId: string;
  classId: string;
  className: string;
  onBack: () => void;
}

type Tab =
  | "students"
  | "attendance"
  | "gradebook"
  | "timetable"
  | "reports";

/* =========================
STUDENT TYPE (STANDARDIZED)
========================= */

interface Student {
  id: string;
  name: string;
  admission: string;
}

/* =========================
MOCK STUDENTS
========================= */

const mockStudents: Student[] = [
  { id: "1", name: "Neo Dlamini", admission: "SS-001" },
  { id: "2", name: "Naledi Motsamai", admission: "SS-002" },
  { id: "3", name: "Kabelo Sechele", admission: "SS-003" },
  { id: "4", name: "Thabo Molefe", admission: "SS-004" },
];

/* =========================
ATTENDANCE TYPES
========================= */

interface AttendanceRecord {
  date: string;
  records: Record<string, "present" | "absent" | "late">;
}

/* =========================
GRADEBOOK TYPES
========================= */

interface Assignment {
  id: string;
  title: string;
  category: "Assignment" | "Quiz" | "Exam";
  maxScore: number;
}

interface Grade {
  studentId: string;
  assignmentId: string;
  score: number;
}

/* =========================
COMPONENT
========================= */

const TeacherClassShell: React.FC<Props> = ({
  subjectId,
  classId,
  className,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("students");

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  /* =========================
  ATTENDANCE STATE
  ========================= */

  const today = new Date().toISOString().split("T")[0];

  const [attendanceDate, setAttendanceDate] = useState(today);

  const [attendance, setAttendance] = useState<
    Record<string, "present" | "absent" | "late">
  >({});

  const [attendanceHistory, setAttendanceHistory] =
    useState<AttendanceRecord[]>([]);

  const setStatus = (
    studentId: string,
    status: "present" | "absent" | "late"
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const saveAttendance = () => {
    setAttendanceHistory((prev) => [
      ...prev,
      { date: attendanceDate, records: attendance },
    ]);

    setAttendance({});
  };

  /* =========================
  GRADEBOOK STATE (SOURCE OF TRUTH)
  ========================= */

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "a1",
      title: "Assignment 1",
      category: "Assignment",
      maxScore: 100,
    },
    {
      id: "q1",
      title: "Quiz 1",
      category: "Quiz",
      maxScore: 100,
    },
  ]);

  const [grades, setGrades] = useState<Grade[]>([]);

  /* =========================
  SAFE PROPS FOR CHILD COMPONENT
  ========================= */

  const gradebookProps = {
    students: mockStudents,
    subjectId,
    classId,
    className,
    assignments,
    grades,
    setAssignments,
    setGrades,
  };

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-sm text-maroon-700 hover:underline"
      >
        ← Back to Subject
      </button>

      {/* HEADER */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold text-maroon-700">
          {className} Class Workspace
        </h2>

        <p className="text-sm text-gray-600">
          Subject: {subjectId} | Class ID: {classId}
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-3">
        {(["students", "attendance", "gradebook", "timetable", "reports"] as Tab[]).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                activeTab === tab
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-lg shadow">

        {/* STUDENTS */}
        {activeTab === "students" && (
          <div className="space-y-3">
            {mockStudents.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className="border p-3 rounded cursor-pointer hover:bg-gray-50"
              >
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">
                  {s.admission}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="space-y-4">

            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />

            {mockStudents.map((s) => (
              <div
                key={s.id}
                className="flex justify-between border p-3 rounded"
              >
                <p>{s.name}</p>

                <div className="flex gap-2">
                  {(["present", "absent", "late"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatus(s.id, status)}
                      className={`px-2 py-1 text-xs rounded ${
                        attendance[s.id] === status
                          ? "bg-maroon-700 text-white"
                          : "border"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={saveAttendance}
              className="bg-maroon-700 text-white px-4 py-2 rounded"
            >
              Save Attendance
            </button>

          </div>
        )}

        {/* GRADEBOOK */}
        {activeTab === "gradebook" && (
          <ClassGradebook {...gradebookProps} />
        )}

        {/* TIMETABLE */}
        {activeTab === "timetable" && <TeacherTimetable />}

        {/* REPORTS */}
        {activeTab === "reports" && (
          <TeacherReports
            students={mockStudents}
            assignments={assignments}
            grades={grades}
          />
        )}

      </div>

      {/* STUDENT DRAWER */}
      {selectedStudent && (
        <StudentProfileDrawer
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

    </div>
  );
};

export default TeacherClassShell;