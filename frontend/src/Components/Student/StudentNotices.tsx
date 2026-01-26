import React, { useState } from "react";
import { notices } from "./MockNotices";
import NoticeCard from "./NoticeCard";
import { countNoticesByType } from "../../Utils/NoticeCounters";

const StudentNotices: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");

  const subjects = ["All", ...Array.from(new Set(notices.map(n => n.subject)))];
  const counts = countNoticesByType(notices);

  const filteredNotices =
    selectedSubject === "All"
      ? notices
      : notices.filter(n => n.subject === selectedSubject);

  return (
    <div className="space-y-6">
      {/* HEADER + BADGES */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-maroon-700">
          Subject Notices
        </h2>

        <div className="flex flex-wrap gap-2 text-xs">
          {counts.test > 0 && (
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-700">
              {counts.test} Tests
            </span>
          )}
          {counts.assignment > 0 && (
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              {counts.assignment} Assignments
            </span>
          )}
          {counts.material > 0 && (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
              {counts.material} Materials
            </span>
          )}
          {counts.general > 0 && (
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {counts.general} General
            </span>
          )}
        </div>
      </div>

      {/* SUBJECT FILTER */}
      <div className="flex flex-wrap gap-2">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-1 rounded-full text-sm border transition
              ${
                selectedSubject === subject
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
              }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* NOTICE LIST */}
      <div className="space-y-3">
        {filteredNotices.length === 0 ? (
          <p className="text-sm text-gray-500">
            No notices available for this subject.
          </p>
        ) : (
          filteredNotices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotices;
