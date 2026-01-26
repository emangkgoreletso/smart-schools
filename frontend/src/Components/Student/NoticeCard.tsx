import React from "react";
import { useNavigate } from "react-router-dom";
import { getDeadlineStatus } from "../../Utils/DeadlineUtils";

/* =======================
   EXPORT Notice TYPE
   ======================= */
export interface Notice {
  id: string;
  subject: string;
  title: string;
  message: string;
  type: "assignment" | "test" | "material" | "general";
  createdAt: string;

  /** Navigation targets */
  targetId?: string;
  testId?: string;
  assignmentId?: string;

  /** Optional deadline */
  dueDate?: string;
}

/* =======================
   Component
   ======================= */
const NoticeCard: React.FC<{ notice: Notice }> = ({ notice }) => {
  const navigate = useNavigate();

  const deadline = getDeadlineStatus(notice.dueDate);

  const badgeColor: Record<Notice["type"], string> = {
    assignment: "bg-blue-100 text-blue-700",
    test: "bg-red-100 text-red-700",
    material: "bg-green-100 text-green-700",
    general: "bg-gray-100 text-gray-700",
  };

  const handleClick = () => {
    if (notice.type === "test") {
      const id = notice.testId ?? notice.targetId;
      if (id) navigate(`/tests/${id}`);
    }

    if (notice.type === "assignment" && notice.assignmentId) {
      navigate(`/assignments/${notice.assignmentId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-lg shadow p-4 border-l-4 transition
        ${deadline?.bg ?? "bg-white"}
        ${deadline?.border ?? "border-maroon-700"}
        ${
          notice.type === "test" || notice.type === "assignment"
            ? "cursor-pointer hover:bg-maroon-50"
            : ""
        }
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-semibold">{notice.title}</h4>

        <span
          className={`text-xs px-2 py-1 rounded-full ${badgeColor[notice.type]}`}
        >
          {notice.type.toUpperCase()}
        </span>
      </div>

      {/* DEADLINE LABEL */}
      {deadline && (
        <div className={`text-xs font-medium mb-1 ${deadline.color}`}>
          ⏰ {deadline.label}
        </div>
      )}

      {/* MESSAGE */}
      <p className="text-sm text-gray-700 mb-2">{notice.message}</p>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{notice.subject}</span>
        <span>{notice.createdAt}</span>
      </div>
    </div>
  );
};

export default NoticeCard;
