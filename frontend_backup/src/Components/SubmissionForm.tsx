import React, { useState, useEffect } from "react";
import { StudentSubmission } from "../Types/Submission";
import { createSubmission, updateSubmission } from "../Api/Api";

interface Props {
  editing: StudentSubmission | null;
  onSaved: () => void;
}

const SubmissionForm: React.FC<Props> = ({ editing, onSaved }) => {
  const [assignmentId, setAssignmentId] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [filePath, setFilePath] = useState("");
  const [status, setStatus] = useState("Pending");
  //const [grade, setGrade] = useState<number | undefined>(undefined);
  const [grade, setGrade] = useState<number | undefined | string>(undefined);

  useEffect(() => {
    if (editing) {
      setAssignmentId(editing.assignmentId);
      setStudentId(editing.studentId);
      setFilePath(editing.filePath);
      setStatus(editing.status);
      setGrade(editing.grade ?? undefined);
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: editing?.id ?? 0,
      assignmentId,
      studentId,
      filePath,
      status,
      grade,
    };

    if (editing) {
      await updateSubmission(editing.id, payload);
    } else {
      await createSubmission(payload);
    }

    // Reset form fields
    setAssignmentId(0);
    setStudentId(0);
    setFilePath("");
    setStatus("Pending");
    setGrade(undefined);

    onSaved();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mt-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-maroon-700 mb-4">
        {editing ? "Edit Submission" : "Submit Assignment"}
      </h2>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Assignment ID
        </label>
        <input
          type="number"
          value={assignmentId}
          onChange={(e) => setAssignmentId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          placeholder="Enter assignment ID"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Student ID
        </label>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          placeholder="Enter your student ID"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          File Path / Upload URL
        </label>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          placeholder="Paste file path or URL"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Graded">Graded</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Grade (optional)
        </label>
        <input
          type="number"
          value={grade ?? ""}
          onChange={(e) => setGrade(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-maroon-700 focus:outline-none"
          placeholder="Enter grade if applicable"
        />
      </div>

      <button
        type="submit"
        className="bg-maroon-700 text-white font-semibold px-4 py-2 rounded hover:bg-maroon-800 transition duration-200 w-full"
      >
        {editing ? "Update Submission" : "Submit Assignment"}
      </button>
    </form>
  );
};

export default SubmissionForm;
