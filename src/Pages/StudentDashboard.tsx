import React from "react";
import StudentNotices from "../Components/Student/StudentNotices";

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Attendance" value="92%" />
        <StatCard title="Average Grade" value="B+" />
        <StatCard title="Assignments Due" value="3" />
        <StatCard title="Upcoming Tests" value="1" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Upcoming Deadlines">
            <ul className="space-y-3 text-sm">
              <Deadline
                subject="Mathematics"
                task="Algebra Assignment"
                due="Due in 2 days"
              />
              <Deadline
                subject="Biology"
                task="Online Quiz"
                due="Tomorrow"
              />
              <Deadline
                subject="History"
                task="Essay Submission"
                due="Due in 5 days"
              />
            </ul>
          </Card>

          <Card title="Today's Classes">
            <ul className="space-y-3 text-sm">
              <Timetable subject="English" time="08:00 – 09:00" />
              <Timetable subject="Mathematics" time="09:30 – 10:30" />
              <Timetable subject="Biology" time="11:00 – 12:00" />
            </ul>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <StudentNotices />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

/* ---------------- SMALL COMPONENTS ---------------- */

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="font-semibold text-maroon-700 mb-3">
      {title}
    </h3>
    {children}
  </div>
);

const StatCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-maroon-700">
      {value}
    </p>
  </div>
);

const Deadline: React.FC<{
  subject: string;
  task: string;
  due: string;
}> = ({ subject, task, due }) => (
  <li className="flex justify-between items-center border-b pb-2">
    <div>
      <p className="font-medium">{subject}</p>
      <p className="text-gray-500">{task}</p>
    </div>
    <span className="text-xs bg-maroon-100 text-maroon-700 px-2 py-1 rounded-full">
      {due}
    </span>
  </li>
);

const Timetable: React.FC<{ subject: string; time: string }> = ({
  subject,
  time,
}) => (
  <li className="flex justify-between border-b pb-2">
    <span className="font-medium">{subject}</span>
    <span className="text-gray-500">{time}</span>
  </li>
);
