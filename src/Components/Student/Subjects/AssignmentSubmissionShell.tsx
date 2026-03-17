import React, { useState } from "react";

interface AssignmentSubmissionShellProps {
  assignmentId: string;
  title: string;
  subject: string;
  dueDate: string;
}

const AssignmentSubmissionShell: React.FC<AssignmentSubmissionShellProps> = ({
  assignmentId,
  title,
  subject,
  dueDate,
}) => {
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder for API submission
    console.log("Submitting assignment:", {
      assignmentId,
      content,
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Assignment Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{subject}</p>
        <p className="text-sm text-gray-500">
          Due: <span className="font-medium">{dueDate}</span>
        </p>
      </div>

      {/* Submission Status */}
      {submitted && (
        <div className="rounded border border-green-300 bg-green-50 p-3 text-green-700 text-sm">
          Assignment submitted successfully.
        </div>
      )}

      {/* Submission Form */}
      {!submitted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Submission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Answer
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              placeholder="Type your assignment response here..."
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload Placeholder */}
          <div className="rounded border border-dashed p-4 text-sm text-gray-500">
            File upload coming soon (PDF, DOCX, Images)
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
            >
              Submit Assignment
            </button>
            <button
              type="button"
              className="rounded border px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Save Draft
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AssignmentSubmissionShell;
