import React from "react";

/* =========================
TYPES
========================= */

interface StatCard {
  label: string;
  value: string;
}

interface Subject {
  id: string;
  name: string;
  teacher: string;
  progress: number; // percentage
}

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "overdue";
}

interface Notice {
  id: string;
  message: string;
  from: string;
}

/* =========================
COMPONENT
========================= */

const StudentDashboard: React.FC = () => {
  /* =========================
  MOCK DATA (replace with API)
  ========================= */

  const stats: StatCard[] = [
    { label: "My Subjects", value: "6" },
    { label: "Pending Tasks", value: "4" },
    { label: "Completed Tasks", value: "18" },
    { label: "Average Score", value: "72%" },
  ];

  const subjects: Subject[] = [
    {
      id: "1",
      name: "Mathematics",
      teacher: "Mr. Dlamini",
      progress: 78,
    },
    {
      id: "2",
      name: "Biology",
      teacher: "Ms. Molefe",
      progress: 64,
    },
    {
      id: "3",
      name: "English",
      teacher: "Mrs. Smith",
      progress: 85,
    },
  ];

  const tasks: Task[] = [
    {
      id: "1",
      title: "Algebra Assignment",
      subject: "Mathematics",
      dueDate: "Today",
      status: "pending",
    },
    {
      id: "2",
      title: "Biology Quiz",
      subject: "Biology",
      dueDate: "Friday",
      status: "pending",
    },
    {
      id: "3",
      title: "Essay Draft",
      subject: "English",
      dueDate: "Completed",
      status: "submitted",
    },
  ];

  const notices: Notice[] = [
    {
      id: "1",
      message: "Midterm exams start next week",
      from: "Academic Office",
    },
    {
      id: "2",
      message: "Upload all pending assignments",
      from: "School Admin",
    },
  ];

  /* =========================
  UI HELPERS
  ========================= */

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "submitted":
        return "text-green-600";
      case "overdue":
        return "text-red-600";
    }
  };

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-maroon-700">
          Student Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Track your subjects, tasks, and academic progress
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg shadow p-4 text-center"
          >
            <p className="text-sm text-gray-600">{s.label}</p>
            <p className="text-2xl font-semibold text-maroon-700">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MY SUBJECTS */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="font-semibold text-maroon-700 mb-4">
            My Subjects
          </h3>

          <div className="space-y-4">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-gray-600">
                      {sub.teacher}
                    </p>
                  </div>

                  <p className="text-sm text-maroon-700 font-semibold">
                    {sub.progress}%
                  </p>
                </div>

                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-maroon-700 h-2 rounded-full"
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NOTICES */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-maroon-700 mb-4">
            Notices
          </h3>

          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="border-b pb-2"
              >
                <p className="text-sm font-medium">{n.from}</p>
                <p className="text-sm text-gray-600">
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* UPCOMING TASKS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-maroon-700 mb-4">
          Upcoming Tasks
        </h3>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">
            No tasks available
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-gray-600">
                    {t.subject}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-sm ${getStatusColor(t.status)}`}>
                    {t.status}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.dueDate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default StudentDashboard;