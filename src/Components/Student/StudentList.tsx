import React, { useState } from "react";
import AssignmentCard from "./Subjects/AssignmentCard";

type AssignmentStatus = "Pending" | "Submitted" | "Graded";

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Homework 1",
    subject: "Mathematics",
    dueDate: "2026-02-10",
    status: "Pending",
  },
  {
    id: "2",
    title: "Photosynthesis Quiz",
    subject: "Biology",
    dueDate: "2026-02-08",
    status: "Submitted",
  },
  {
    id: "3",
    title: "Essay: Colonial History",
    subject: "History",
    dueDate: "2026-02-01",
    status: "Graded",
  },
];

const AssignmentsList: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Assignments
        </h2>
        <span className="text-sm text-gray-500">
          {mockAssignments.length} total
        </span>
      </div>

      {/* Empty State */}
      {mockAssignments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No assignments available.
        </div>
      )}

      {/* Assignment Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.title}
            subject={assignment.subject}
            dueDate={assignment.dueDate}
            status={assignment.status}
            onClick={() => setSelectedAssignment(assignment)}
            
          />
        ))}
      </div>

      {/* Selected Assignment Preview (placeholder for future flow) */}
      {selectedAssignment && (
        <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800">
            {selectedAssignment.title}
          </h3>
          <p className="text-sm text-gray-600">
            Subject: {selectedAssignment.subject}
          </p>
          <p className="text-sm text-gray-600">
            Due: {selectedAssignment.dueDate}
          </p>
          <p className="text-sm text-gray-600">
            Status: {selectedAssignment.status}
          </p>

          <div className="mt-4 flex gap-2">
            <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              Open
            </button>
            <button
              className="rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setSelectedAssignment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsList;
