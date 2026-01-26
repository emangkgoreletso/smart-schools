import React from "react";

interface DashboardStat {
  label: string;
  value: string;
}

interface UpcomingItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
}

interface Notice {
  id: string;
  message: string;
  subject: string;
}

const StudentCentreDashboard: React.FC = () => {
  const stats: DashboardStat[] = [
    { label: "Attendance", value: "92%" },
    { label: "Average Grade", value: "B+" },
    { label: "Subjects", value: "8" },
    { label: "Pending Tasks", value: "3" },
  ];

  const upcoming: UpcomingItem[] = [
    {
      id: "1",
      title: "Math Assignment 3",
      subject: "Mathematics",
      dueDate: "Due Tomorrow",
    },
    {
      id: "2",
      title: "History Quiz",
      subject: "History",
      dueDate: "Friday",
    },
  ];

  const notices: Notice[] = [
    {
      id: "1",
      message: "Physics test postponed to next week",
      subject: "Physics",
    },
    {
      id: "2",
      message: "English essay guidelines updated",
      subject: "English",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg shadow p-4 text-center"
          >
            <p className="text-sm text-gray-600">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>

          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming deadlines</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((u) => (
                <li
                  key={u.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{u.title}</p>
                    <p className="text-sm text-gray-600">{u.subject}</p>
                  </div>
                  <span className="text-sm text-red-600">{u.dueDate}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notices */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Latest Notices</h3>

          {notices.length === 0 ? (
            <p className="text-sm text-gray-500">No new notices</p>
          ) : (
            <ul className="space-y-3">
              {notices.map((n) => (
                <li key={n.id} className="text-sm border-b pb-2">
                  <p className="font-medium">{n.subject}</p>
                  <p className="text-gray-600">{n.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCentreDashboard;
