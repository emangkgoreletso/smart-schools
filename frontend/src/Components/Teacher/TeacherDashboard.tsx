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

interface TodayClass {
  id: string;
  subject: string;
  class: string;
  time: string;
}

const TeacherDashboard: React.FC = () => {

  const stats: DashboardStat[] = [
    { label: "My Subjects", value: "5" },
    { label: "Total Students", value: "162" },
    { label: "Assignments to Mark", value: "12" },
    { label: "Tests This Week", value: "3" },
  ];

  const todayClasses: TodayClass[] = [
    { id: "1", subject: "Mathematics", class: "Form 3A", time: "08:00" },
    { id: "2", subject: "Mathematics", class: "Form 3B", time: "10:00" },
    { id: "3", subject: "Biology", class: "Form 2C", time: "13:00" },
  ];

  const upcoming: UpcomingItem[] = [
    {
      id: "1",
      title: "Grade Algebra Assignment",
      subject: "Mathematics",
      dueDate: "Today",
    },
    {
      id: "2",
      title: "Prepare Biology Quiz",
      subject: "Biology",
      dueDate: "Friday",
    },
  ];

  const notices: Notice[] = [
    {
      id: "1",
      message: "Staff meeting scheduled for Thursday",
      subject: "Administration",
    },
    {
      id: "2",
      message: "Upload midterm grades before next week",
      subject: "Academic Office",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-maroon-700">
          Teacher Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Overview of your teaching activity today
        </p>
      </div>


      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg shadow p-5 text-center"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-3xl font-bold text-maroon-700">
              {s.value}
            </p>
          </div>
        ))}

      </div>


      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* TODAY'S CLASSES */}
        <div className="bg-white rounded-lg shadow p-6">

          <h3 className="font-semibold text-maroon-700 mb-4">
            Today's Classes
          </h3>

          <ul className="space-y-3">

            {todayClasses.map((c) => (
              <li
                key={c.id}
                className="flex justify-between items-center border-b pb-2"
              >

                <div>
                  <p className="font-medium">{c.subject}</p>
                  <p className="text-sm text-gray-600">{c.class}</p>
                </div>

                <span className="text-sm text-gray-500">
                  {c.time}
                </span>

              </li>
            ))}

          </ul>

        </div>


        {/* UPCOMING TASKS */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">

          <h3 className="font-semibold text-maroon-700 mb-4">
            Upcoming Tasks
          </h3>

          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-500">
              No upcoming tasks
            </p>
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

                  <span className="text-sm text-red-600 font-medium">
                    {u.dueDate}
                  </span>

                </li>
              ))}

            </ul>
          )}

        </div>


        {/* STAFF NOTICES */}
        <div className="bg-white rounded-lg shadow p-6">

          <h3 className="font-semibold text-maroon-700 mb-4">
            Staff Notices
          </h3>

          {notices.length === 0 ? (
            <p className="text-sm text-gray-500">
              No new notices
            </p>
          ) : (
            <ul className="space-y-3">

              {notices.map((n) => (
                <li
                  key={n.id}
                  className="border-b pb-2 text-sm"
                >

                  <p className="font-medium">{n.subject}</p>

                  <p className="text-gray-600">
                    {n.message}
                  </p>

                </li>
              ))}

            </ul>
          )}

        </div>


        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">

          <h3 className="font-semibold text-maroon-700 mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-lg border border-maroon-700 text-maroon-700 hover:bg-maroon-50 text-sm">
              Upload Material
            </button>

            <button className="px-4 py-2 rounded-lg border border-maroon-700 text-maroon-700 hover:bg-maroon-50 text-sm">
              Create Assignment
            </button>

            <button className="px-4 py-2 rounded-lg border border-maroon-700 text-maroon-700 hover:bg-maroon-50 text-sm">
              Record Attendance
            </button>

            <button className="px-4 py-2 rounded-lg border border-maroon-700 text-maroon-700 hover:bg-maroon-50 text-sm">
              Send Announcement
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;