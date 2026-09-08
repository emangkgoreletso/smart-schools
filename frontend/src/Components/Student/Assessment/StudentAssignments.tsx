import React, { useState } from "react";

/* =========================================
TYPES
========================================= */

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  attachment?: string;
}

interface Submission {
  assignmentId: string;
  fileName: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

interface Props {
  subjectId: string;
  studentId: string;
}

/* =========================================
MOCK DATA (Teacher assignments)
Later comes from backend
========================================= */

const teacherAssignments: Assignment[] = [
  {
    id: "a1",
    title: "Algebra Worksheet",
    description: "Solve all questions on linear equations.",
    dueDate: "2026-05-01",
    totalMarks: 20,
    attachment: "#",
  },
  {
    id: "a2",
    title: "Quadratic Functions",
    description: "Submit solutions for exercises 1–10.",
    dueDate: "2026-05-05",
    totalMarks: 25,
  },
];

/* =========================================
COMPONENT
========================================= */

const StudentAssignments: React.FC<Props> = ({
  subjectId,
  studentId,
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const [uploadFiles, setUploadFiles] = useState<{
    [key: string]: File | null;
  }>({});

  /* =========================================
  HELPERS
  ========================================= */

  const getSubmission = (assignmentId: string) => {
    return submissions.find(
      (s) => s.assignmentId === assignmentId
    );
  };

  const isLate = (dueDate: string) => {
    return new Date() > new Date(dueDate);
  };

  /* =========================================
  FILE SELECT
  ========================================= */

  const handleFileSelect = (
    assignmentId: string,
    file: File | null
  ) => {
    setUploadFiles((prev) => ({
      ...prev,
      [assignmentId]: file,
    }));
  };

  /* =========================================
  SUBMIT ASSIGNMENT
  ========================================= */

  const submitAssignment = (assignmentId: string) => {
    const file = uploadFiles[assignmentId];

    if (!file) return;

    const newSubmission: Submission = {
      assignmentId,
      fileName: file.name,
      submittedAt: new Date().toISOString(),
    };

    setSubmissions((prev) => {
      const others = prev.filter(
        (s) => s.assignmentId !== assignmentId
      );

      return [...others, newSubmission];
    });

    alert("Assignment submitted successfully!");
  };

  /* =========================================
  UI
  ========================================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Assignments
        </h2>

        <p className="text-sm text-gray-600">
          Submit your assignments before the deadline
        </p>
      </div>

      {/* ASSIGNMENT LIST */}

      <div className="space-y-4">

        {teacherAssignments.map((assignment) => {
          const submission = getSubmission(assignment.id);
          const late = isLate(assignment.dueDate);

          return (
            <div
              key={assignment.id}
              className="border rounded-lg p-5 space-y-3"
            >
              {/* TITLE */}

              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-maroon-700">
                  {assignment.title}
                </h3>

                {late && !submission && (
                  <span className="text-red-600 text-xs">
                    Late
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}

              <p className="text-sm text-gray-600">
                {assignment.description}
              </p>

              {/* DETAILS */}

              <div className="text-xs text-gray-500">
                Due: {assignment.dueDate} | Marks:{" "}
                {assignment.totalMarks}
              </div>

              {/* TEACHER ATTACHMENT */}

              {assignment.attachment && (
                <a
                  href={assignment.attachment}
                  className="text-sm text-maroon-700 underline"
                >
                  Download Assignment File
                </a>
              )}

              {/* SUBMISSION STATUS */}

              {submission ? (
                <div className="bg-gray-50 border rounded p-3 space-y-1">

                  <p className="text-sm text-green-700">
                    Submitted: {submission.fileName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(
                      submission.submittedAt
                    ).toLocaleString()}
                  </p>

                  {submission.grade !== undefined && (
                    <p className="text-sm font-medium">
                      Grade: {submission.grade}/
                      {assignment.totalMarks}
                    </p>
                  )}

                  {submission.feedback && (
                    <p className="text-sm text-gray-700">
                      Feedback: {submission.feedback}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">

                  {/* FILE UPLOAD */}

                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileSelect(
                        assignment.id,
                        e.target.files
                          ? e.target.files[0]
                          : null
                      )
                    }
                    className="text-sm"
                  />

                  {/* SUBMIT BUTTON */}

                  <button
                    onClick={() =>
                      submitAssignment(assignment.id)
                    }
                    className="bg-maroon-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Submit Assignment
                  </button>

                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default StudentAssignments;