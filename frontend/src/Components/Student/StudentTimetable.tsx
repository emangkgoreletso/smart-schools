import React, { useMemo, useState } from "react";

/* =========================
TYPES
========================= */

type Term = "Term 1" | "Term 2" | "Term 3";

interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

/* =========================
MOCK DATA (replace with API later)
========================= */

const mockTimetables: Record<Term, ScheduleItem[]> = {
  "Term 1": [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Dube", room: "A1" },
    { day: "Monday", time: "09:00 - 10:00", subject: "Biology", teacher: "Ms. Molefe", room: "B2" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English", teacher: "Mrs. Smith", room: "C1" },
    { day: "Wednesday", time: "10:00 - 11:00", subject: "Physics", teacher: "Mr. Nkosi", room: "Lab 1" },
  ],

  "Term 2": [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Dube", room: "A1" },
    { day: "Tuesday", time: "09:00 - 10:00", subject: "Chemistry", teacher: "Ms. Molefe", room: "Lab 2" },
    { day: "Thursday", time: "10:00 - 11:00", subject: "History", teacher: "Mr. Kgosi", room: "D1" },
  ],

  "Term 3": [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Dube", room: "A1" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Biology", teacher: "Ms. Molefe", room: "B2" },
    { day: "Friday", time: "10:00 - 11:00", subject: "English", teacher: "Mrs. Smith", room: "C1" },
  ],
};

/* =========================
HELPER
========================= */

const daysOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

/* =========================
COMPONENT
========================= */

const StudentTimetable: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<Term>("Term 3");

  const timetable = useMemo(() => {
    return mockTimetables[selectedTerm] || [];
  }, [selectedTerm]);

  const groupedByDay = useMemo(() => {
    const grouped: Record<string, ScheduleItem[]> = {};

    timetable.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });

    return grouped;
  }, [timetable]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          My Timetable
        </h2>

        <p className="text-sm text-gray-600">
          View your weekly class schedule across all enrolled subjects
        </p>
      </div>

      {/* TERM SWITCHER */}
      <div className="flex gap-2 flex-wrap">

        {(["Term 1", "Term 2", "Term 3"] as Term[]).map((term) => (
          <button
            key={term}
            onClick={() => setSelectedTerm(term)}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${
                selectedTerm === term
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
              }`}
          >
            {term}
          </button>
        ))}

      </div>

      {/* TIMETABLE GRID */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">

        {daysOrder.map((day) => (
          <div key={day}>

            <h3 className="font-semibold text-maroon-700 mb-2">
              {day}
            </h3>

            {groupedByDay[day]?.length ? (
              <div className="space-y-2">

                {groupedByDay[day].map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 flex flex-col md:flex-row md:justify-between md:items-center"
                  >

                    {/* SUBJECT */}
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.subject}
                      </p>

                      <p className="text-xs text-gray-500">
                        {item.teacher} • Room {item.room}
                      </p>
                    </div>

                    {/* TIME */}
                    <div className="text-sm text-maroon-700 font-medium mt-2 md:mt-0">
                      {item.time}
                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No classes scheduled
              </p>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default StudentTimetable;