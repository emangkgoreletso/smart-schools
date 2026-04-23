import React, { useState } from "react";
import { Announcement } from "../../Domain/LMS/Announcement.types";

interface ClassItem {
  id: string;
  name: string;
}

interface Props {
  subjectId: string;
  classes: ClassItem[];
}

const TeacherAnnouncements: React.FC<Props> = ({
  subjectId,
  classes,
}) => {

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetClass, setTargetClass] = useState<string>("all");

  const addAnnouncement = () => {
    if (!title.trim() || !message.trim()) return;

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      subjectId,
      title,
      message,
      date: new Date().toISOString(),
      classId: targetClass === "all" ? undefined : targetClass,
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);

    setTitle("");
    setMessage("");
  };

  return (
    <div className="space-y-5">

      <h2 className="text-xl font-bold text-maroon-700">
        📢 Subject Announcements
      </h2>

      <p className="text-sm text-gray-600">
        Subject ID: {subjectId}
      </p>

      {/* CREATE ANNOUNCEMENT */}
      <div className="space-y-3 border p-4 rounded">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement title"
          className="border px-3 py-2 rounded w-full"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="border px-3 py-2 rounded w-full"
        />

        {/* CLASS TARGETING */}
        <select
          value={targetClass}
          onChange={(e) => setTargetClass(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="all">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={addAnnouncement}
          className="bg-maroon-700 text-white px-4 py-2 rounded"
        >
          Publish
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {announcements.map((a) => (
          <div key={a.id} className="border p-3 rounded">

            <p className="font-semibold">{a.title}</p>
            <p className="text-sm">{a.message}</p>

            <p className="text-xs text-gray-400">
              {new Date(a.date).toLocaleString()}
            </p>

            {a.classId && (
              <p className="text-xs text-maroon-700 mt-1">
                Targeted Class: {a.classId}
              </p>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default TeacherAnnouncements;