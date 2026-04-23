import React, { useState } from "react";

import ParentOverview from "../Components/Parents/ParentOverview";
import ParentAttendance from "../Components/Parents/ParentAttendance";
import ParentPerformance from "../Components/Parents/ParentPerformance";
import ParentPayments from "../Components/Parents/ParentPayments";
import ParentAnnouncements from "../Components/Parents/ParentAnnouncements";
import ParentMessages from "../Components/Parents/ParentMessages";
import ParentMeetings from "../Components/Parents/ParentMeetings";

type Tab =
  | "Overview"
  | "Attendance"
  | "Performance"
  | "Payments"
  | "Announcements"
  | "Messages"
  | "Meetings";

const ParentsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  // temporary mock child
  const childId = "student-1";

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-maroon-700">
          Parent Portal
        </h1>

        <p className="text-sm text-gray-600">
          Monitor your child’s academic progress and school activity
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
          <ParentOverview childId={childId} />
        )}

        {activeTab === "Attendance" && (
          <ParentAttendance childId={childId} />
        )}

        {activeTab === "Performance" && (
          <ParentPerformance childId={childId} />
        )}

        {activeTab === "Payments" && (
          <ParentPayments childId={childId} />
        )}

        {activeTab === "Announcements" && (
          <ParentAnnouncements childId={childId} />
        )}

        {activeTab === "Messages" && (
          <ParentMessages childId={childId} />
        )}

        {activeTab === "Meetings" && (
          <ParentMeetings childId={childId} />
        )}

      </div>

    </div>
  );
};

export default ParentsPortal;