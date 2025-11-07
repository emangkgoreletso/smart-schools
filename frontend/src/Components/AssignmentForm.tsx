import React, { useState, useEffect } from "react";
import { Assignment } from "../Types/Assignment";
import { createAssignment, updateAssignment } from "../Api/Api";

interface Props {
  editing: Assignment | null;
  onSaved: () => void;
}

const AssignmentForm: React.FC<Props> = ({ editing, onSaved }) => {
  const [title, setTitle] = useState<string>("");
  const [courseId, setCourseId] = useState<number>(0);
  const [filePath, setFilePath] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title ?? "");
      setCourseId(editing.courseId ?? 0);
      setFilePath(editing.filePath ?? "");
      setSummary(editing.summary ?? "");
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Assignment = {
      id: editing?.id ?? 0,
      title,
      courseId,
      filePath,
      summary,
    };

    if (editing && editing.id) {
      await updateAssignment(editing.id, payload);
    } else {
      await createAssignment(payload);
    }

    // Reset form
    setTitle("");
    setCourseId(0);
    setFilePath("");
    setSummary("");

    onSaved();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mt-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-maroon-700 mb-4">
        {editing ? "Edit Assignment" : "Create Assignment"}
      </h2>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter assignment title"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Course ID
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          value={courseId}
          onChange={(e) => setCourseId(Number(e.target.value))}
          placeholder="Enter course ID"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          File Path / URL
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          placeholder="Paste file URL or path"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Summary
        </label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write a short description"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-maroon-700 text-white font-semibold px-4 py-2 rounded hover:bg-maroon-800 transition duration-200 w-full"
      >
        {editing ? "Update Assignment" : "Add Assignment"}
      </button>
    </form>
  );
};

export default AssignmentForm;
