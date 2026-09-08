import React from "react";

const NoticeBoard: React.FC = () => {
  const sampleNotices = [
    {
      id: 1,
      title: "New Assignment Available",
      msg: "Mathematics - Algebra Assignment uploaded.",
      date: "2025-02-11",
    },
    {
      id: 2,
      title: "Fees Reminder",
      msg: "Term 1 payment is due on the 15th.",
      date: "2025-02-10",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-maroon-700">
        Notice Board
      </h2>

      <div className="flex flex-col gap-4">
        {sampleNotices.map((n) => (
          <div
            key={n.id}
            className="border-l-4 border-maroon-700 bg-white p-4 shadow rounded"
          >
            <h3 className="font-bold">{n.title}</h3>
            <p className="text-gray-700">{n.msg}</p>
            <p className="text-sm text-gray-500 mt-1">{n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
