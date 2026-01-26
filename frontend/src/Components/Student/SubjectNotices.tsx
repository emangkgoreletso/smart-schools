import React from "react";

interface SubjectNotice {
  id: string;
  subject: string;
  title: string;
  message: string;
  postedBy: string;
  date: string;
}

const SubjectNotices: React.FC = () => {
  const notices: SubjectNotice[] = [
    {
      id: "1",
      subject: "Mathematics",
      title: "Test Scheduled",
      message: "Algebra test scheduled for Friday at 10:00 AM.",
      postedBy: "Mr. Molefe",
      date: "2026-01-12",
    },
    {
      id: "2",
      subject: "English",
      title: "New Study Material",
      message: "Poetry analysis notes uploaded.",
      postedBy: "Ms. Dube",
      date: "2026-01-11",
    },
    {
      id: "3",
      subject: "Physics",
      title: "Assignment Deadline",
      message: "Lab report submission closes tomorrow.",
      postedBy: "System",
      date: "2026-01-10",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Subject Notices</h2>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-maroon-700">
                  {notice.subject}
                </p>
                <p className="font-semibold">{notice.title}</p>
              </div>
              <span className="text-xs text-gray-500">{notice.date}</span>
            </div>

            <p className="text-sm text-gray-700 mt-2">
              {notice.message}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Posted by {notice.postedBy}
            </p>
          </div>
        ))}
      </div>

      {notices.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No notices available.
        </p>
      )}
    </div>
  );
};

export default SubjectNotices;
