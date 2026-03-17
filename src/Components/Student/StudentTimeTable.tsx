import React from "react";

interface TimetableEntry {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  day: string;
  classes: TimetableEntry[];
}

const StudentTimetable: React.FC = () => {
  const timetable: DaySchedule[] = [
    {
      day: "Monday",
      classes: [
        {
          id: "1",
          subject: "Mathematics",
          teacher: "Mr. Molefe",
          room: "Room 12",
          startTime: "08:00",
          endTime: "09:00",
        },
        {
          id: "2",
          subject: "English",
          teacher: "Ms. Dube",
          room: "Room 5",
          startTime: "09:15",
          endTime: "10:15",
        },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        {
          id: "3",
          subject: "Physics",
          teacher: "Mr. Nkosi",
          room: "Lab 1",
          startTime: "08:00",
          endTime: "09:30",
        },
        {
          id: "4",
          subject: "Geography",
          teacher: "Ms. Phiri",
          room: "Room 7",
          startTime: "09:45",
          endTime: "10:45",
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">My Timetable</h2>

      <div className="space-y-6">
        {timetable.map((day) => (
          <div key={day.day}>
            <h3 className="font-medium text-maroon-700 mb-2">
              {day.day}
            </h3>

            <div className="space-y-3">
              {day.classes.map((cls) => (
                <div
                  key={cls.id}
                  className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">{cls.subject}</p>
                    <p className="text-sm text-gray-600">
                      {cls.teacher} • {cls.room}
                    </p>
                  </div>

                  <div className="text-sm font-medium text-gray-700">
                    {cls.startTime} – {cls.endTime}
                  </div>
                </div>
              ))}
            </div>

            {day.classes.length === 0 && (
              <p className="text-sm text-gray-500">
                No classes scheduled.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTimetable;
