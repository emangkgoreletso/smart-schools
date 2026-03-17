// src/Components/Student/subjects/AssignmentsTab.tsx

import React, { useState, useMemo } from "react";
import AssignmentCard from ".//AssignmentCard";
import { Assignment, AssignmentStatus } from "../../../Types/Assignments";


//interface Assignment {
  //subject: string;
  //id: string;
 // title: string;
  //dueDate: string;
  //status: "new" | "pending" | "submitted" | "marked" | "overdue";
  //grade?: number;
  //briefUrl: string;
//}

interface Props {
  //subjectId: string;
  assignment: Assignment;
  onClick?: () => void;
}

type Filter = "all" | AssignmentStatus

const AssignmentsTab: React.FC<Props> = ({ subjectId }) => {
  const [filter, setFilter] = useState<Filter>("all");

  // 🚀 Replace with API call:
  // GET /api/subjects/:subjectId/assignments
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Algebra Worksheet 1",
      dueDate: "2026-02-25",
      status: "new",
      briefUrl: "#",
    },
    {
      id: "2",
      title: "Geometry Homework",
      dueDate: "2026-02-15",
      status: "submitted",
      grade: 78,
      briefUrl: "#",
    },
    {
      id: "3",
      title: "Statistics Assignment",
      dueDate: "2026-02-10",
      status: "overdue",
      briefUrl: "#",
    },
  ];

  const filteredAssignments = useMemo(() => {
    if (filter === "all") return assignments;
    return assignments.filter((a) => a.status === filter);
  }, [filter, assignments]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-maroon-700">
        Subject Assignments
      </h3>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {[
          "all",
          "new",
          "pending",
          "submitted",
          "marked",
          "overdue",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as Filter)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              filter === status
                ? "bg-maroon-700 text-white"
                : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredAssignments.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No assignments available under this category.
        </div>
      )}

      {/* ASSIGNMENT LIST */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.subject}
            dueDate={assignment.dueDate}
            status={assignment.status}
            Assignment={assignment}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignmentsTab;
