import React from "react";

interface Props {
  childId: string;
}

const ParentAnnouncements: React.FC<Props> = ({ childId }) => {

  const announcements = [
    {
      title: "Parent Meeting",
      message: "Parent meeting scheduled for Friday.",
      date: "2026-04-12",
    },
    {
      title: "Exam Week",
      message: "Midterm exams begin next Monday.",
      date: "2026-04-10",
    },
  ];

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold text-maroon-700">
        School Announcements
      </h3>

      <div className="space-y-3">

        {announcements.map((a, i) => (
          <div key={i} className="border rounded-lg p-4">

            <p className="font-semibold">
              {a.title}
            </p>

            <p className="text-sm text-gray-600">
              {a.message}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {a.date}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ParentAnnouncements;