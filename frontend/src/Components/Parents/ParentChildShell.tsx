import React, { useState } from "react";

import ParentOverview from "./ParentOverview";
import ParentAttendance from "./ParentAttendance";
import ParentPerformance from "./ParentPerformance";
import ParentPayments from "./ParentPayments";
import ParentAnnouncements from "./ParentAnnouncements";
import ParentMessages from "./ParentMessages";
import ParentMeetings from "./ParentMeetings";

interface Props {
  studentId: string;
  childName: string;
  className: string;
  onBack: () => void;
}

type Tab =
  | "Overview"
  | "Attendance"
  | "Performance"
  | "Payments"
  | "Announcements"
  | "Messages"
  | "Meetings";

const ParentChildShell: React.FC<Props> = ({
  studentId,
  childName,
  className,
  onBack,
}) => {

  const [activeTab, setActiveTab] =
    useState<Tab>("Overview");

  return (
    <div className="space-y-6">

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-sm text-maroon-700 hover:underline"
      >
        ← Back to Children
      </button>

      {/* HEADER */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-maroon-700">
          {childName}
        </h2>

        <p className="text-sm text-gray-600">
          Class: {className}
        </p>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-wrap gap-3">
        {(
          [
            "Overview",
            "Attendance",
            "Performance",
            "Payments",
            "Announcements",
            "Messages",
            "Meetings",
          ] as Tab[]
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border text-sm transition
            ${
              activeTab === tab
                ? "bg-maroon-700 text-white border-maroon-700"
                : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-lg shadow">

        {activeTab === "Overview" && (
          <ParentOverview
  studentId={studentId}
  studentName={childName}
  className={className}
/>
        )}

        {activeTab === "Attendance" && (
          <ParentAttendance studentId={studentId} />
        )}

        {activeTab === "Performance" && (
          <ParentPerformance studentId={studentId} />
        )}

        {activeTab === "Payments" && (
          <ParentPayments studentId={studentId} />
        )}

        {activeTab === "Announcements" && (
          <ParentAnnouncements studentId={studentId} />
        )}

        {activeTab === "Messages" && (
          <ParentMessages studentId={studentId} />
        )}

        {activeTab === "Meetings" && (
          <ParentMeetings studentId={studentId} />
        )}

      </div>

    </div>
  );
};

export default ParentChildShell;