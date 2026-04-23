import React, { useMemo, useState } from "react";

/* ======================================================
TYPES
====================================================== */

type ViewMode = "daily" | "weekly" | "monthly" | "term";

type Term = "Term 1" | "Term 2" | "Term 3";

interface TimetableEntry {
  id: string;
  subject: string;
  className: string;
  room: string;
  day: string;
  start: string;
  end: string;
}

/* ======================================================
MOCK DATA (Replace with API later)
====================================================== */

const timetableData: TimetableEntry[] = [
  {
    id: "1",
    subject: "Mathematics",
    className: "Form 3A",
    room: "Room 12",
    day: "Monday",
    start: "08:00",
    end: "09:00",
  },
  {
    id: "2",
    subject: "Mathematics",
    className: "Form 3B",
    room: "Room 12",
    day: "Monday",
    start: "09:00",
    end: "10:00",
  },
  {
    id: "3",
    subject: "Mathematics",
    className: "Form 3C",
    room: "Room 14",
    day: "Tuesday",
    start: "08:00",
    end: "09:00",
  },
  {
    id: "4",
    subject: "Mathematics",
    className: "Form 3A",
    room: "Room 12",
    day: "Wednesday",
    start: "10:00",
    end: "11:00",
  },
];

/* ======================================================
CONSTANTS
====================================================== */

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const terms: Term[] = ["Term 1", "Term 2", "Term 3"];

/* ======================================================
COMPONENT
====================================================== */

const TeacherTimetable: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [selectedTerm, setSelectedTerm] = useState<Term>("Term 1");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  /* ======================================================
  FILTERS
  ====================================================== */

  const dailyEntries = useMemo(() => {
    return timetableData.filter((t) => t.day === selectedDay);
  }, [selectedDay]);

  const weeklyEntries = useMemo(() => {
    return timetableData;
  }, []);

  /* ======================================================
  RENDER HELPERS
  ====================================================== */

  const renderDaily = () => (
    <div className="space-y-3">

      <div className="flex gap-2 flex-wrap">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedDay === day
                ? "bg-maroon-700 text-white"
                : "border-maroon-700 text-maroon-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="border rounded-lg">

        {dailyEntries.length === 0 && (
          <p className="p-4 text-sm text-gray-500">
            No classes scheduled
          </p>
        )}

        {dailyEntries.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between border-b p-3"
          >
            <div>
              <p className="font-medium">{entry.subject}</p>
              <p className="text-sm text-gray-600">
                {entry.className}
              </p>
            </div>

            <div className="text-sm text-right">
              <p>
                {entry.start} - {entry.end}
              </p>
              <p className="text-gray-500">{entry.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWeekly = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

      {days.map((day) => (
        <div key={day} className="border rounded-lg">

          <div className="bg-gray-100 p-2 font-semibold text-sm text-center">
            {day}
          </div>

          <div className="p-2 space-y-2">

            {weeklyEntries
              .filter((t) => t.day === day)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="border rounded p-2 text-xs"
                >
                  <p className="font-medium">{entry.subject}</p>

                  <p className="text-gray-600">
                    {entry.className}
                  </p>

                  <p>
                    {entry.start} - {entry.end}
                  </p>

                  <p className="text-gray-500">
                    {entry.room}
                  </p>
                </div>
              ))}

          </div>

        </div>
      ))}

    </div>
  );

  const renderMonthly = () => (
    <div className="border rounded-lg p-4 text-center text-gray-600 text-sm">
      Monthly timetable overview will aggregate all scheduled
      classes within the selected month.  
      (Typically used for **institution planning view**.)
    </div>
  );

  const renderTerm = () => (
    <div className="border rounded-lg">

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Day</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Class</th>
            <th className="p-2">Time</th>
            <th className="p-2">Room</th>
          </tr>
        </thead>

        <tbody>
          {timetableData.map((entry) => (
            <tr key={entry.id} className="border-t">

              <td className="p-2">{entry.day}</td>

              <td className="p-2 font-medium">
                {entry.subject}
              </td>

              <td className="p-2">{entry.className}</td>

              <td className="p-2">
                {entry.start} - {entry.end}
              </td>

              <td className="p-2">{entry.room}</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );

  /* ======================================================
  MAIN UI
  ====================================================== */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Teacher Timetable
        </h2>

        <p className="text-sm text-gray-600">
          View your schedule by day, week, month, or term.
        </p>
      </div>

      {/* TERM SELECTOR */}
      <div className="flex gap-2">

        {terms.map((term) => (
          <button
            key={term}
            onClick={() => setSelectedTerm(term)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedTerm === term
                ? "bg-maroon-700 text-white"
                : "border-maroon-700 text-maroon-700"
            }`}
          >
            {term}
          </button>
        ))}

      </div>

      {/* VIEW SELECTOR */}
      <div className="flex gap-2 flex-wrap">

        {(["daily", "weekly", "monthly", "term"] as ViewMode[]).map(
          (mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-full border text-sm ${
                viewMode === mode
                  ? "bg-maroon-700 text-white"
                  : "border-maroon-700 text-maroon-700"
              }`}
            >
              {mode}
            </button>
          )
        )}

      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-lg shadow p-4">

        {viewMode === "daily" && renderDaily()}
        {viewMode === "weekly" && renderWeekly()}
        {viewMode === "monthly" && renderMonthly()}
        {viewMode === "term" && renderTerm()}

      </div>

    </div>
  );
};

export default TeacherTimetable;