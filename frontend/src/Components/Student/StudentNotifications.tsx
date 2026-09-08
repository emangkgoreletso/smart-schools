import React, { useMemo } from "react";

/* =========================
TYPES
========================= */

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "grade" | "assignment" | "announcement" | "attendance";
  date: string;
}

interface Props {
  notifications?: Notification[];
}

/* =========================
COMPONENT
========================= */

const StudentNotifications: React.FC<Props> = ({
  notifications = [],
}) => {
  /* =========================
  GROUPING (LMS STYLE)
  ========================= */

  const grouped = useMemo(() => {
    return {
      grade: notifications.filter((n) => n.type === "grade"),
      assignment: notifications.filter((n) => n.type === "assignment"),
      announcement: notifications.filter((n) => n.type === "announcement"),
      attendance: notifications.filter((n) => n.type === "attendance"),
    };
  }, [notifications]);

  /* =========================
  EMPTY STATE
  ========================= */

  if (!notifications.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-maroon-700">
          Notifications
        </h2>

        <p className="text-sm text-gray-500">
          No new notifications yet.
        </p>
      </div>
    );
  }

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-maroon-700">
        Notifications
      </h2>

      {/* =========================
          ASSIGNMENTS
      ========================= */}
      {grouped.assignment.length > 0 && (
        <Section title="Assignments" items={grouped.assignment} />
      )}

      {/* =========================
          GRADES
      ========================= */}
      {grouped.grade.length > 0 && (
        <Section title="Grades" items={grouped.grade} />
      )}

      {/* =========================
          ANNOUNCEMENTS
      ========================= */}
      {grouped.announcement.length > 0 && (
        <Section title="Announcements" items={grouped.announcement} />
      )}

      {/* =========================
          ATTENDANCE
      ========================= */}
      {grouped.attendance.length > 0 && (
        <Section title="Attendance" items={grouped.attendance} />
      )}

    </div>
  );
};

/* =========================
SECTION COMPONENT
========================= */

const Section = ({
  title,
  items,
}: {
  title: string;
  items: any[];
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">

      <h3 className="font-semibold text-maroon-700">
        {title}
      </h3>

      <div className="space-y-2">

        {items.map((n) => (
          <div
            key={n.id}
            className="border rounded p-3 hover:bg-gray-50 transition"
          >
            <p className="font-medium text-maroon-700">
              {n.title}
            </p>

            <p className="text-sm text-gray-600">
              {n.message}
            </p>

            <p className="text-xs text-gray-400">
              {n.date}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default StudentNotifications;