import React from "react";
import { Assignment } from "../../../Types/Assignments";
 
type AssignmentStatus = "Pending" | "Submitted" | "Graded";

 
interface Props {
  assignment: Assignment;
  onClick?: () => void;
}
 
const statusStyles: Record<AssignmentStatus, string> = {
  Pending: "border-yellow-400 text-yellow-700 bg-yellow-50",
  Submitted: "border-blue-400 text-blue-700 bg-blue-50",
  Graded: "border-green-400 text-green-700 bg-green-50",
};
 
const AssignmentCard: React.FC<Props> = ({ assignment, onClick }) => {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-3">
      
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800">
            {assignment.title}
          </h4>
          </div>
 
        <span
          className={`text-xs px-3 py-1 rounded-full border ${statusStyles[assignment.status]}`}
        >
          {assignment.status}
        </span>
      </div>
 
      <p className="text-sm text-gray-600">
        📅 Due: {assignment.dueDate}
      </p>
 
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center text-sm px-4 py-1.5 rounded-full
        border border-maroon-700 text-maroon-700
        hover:bg-maroon-50 transition"
      >
        View Assignment
      </button>
 
    </div>
  );
};
 
export default AssignmentCard;