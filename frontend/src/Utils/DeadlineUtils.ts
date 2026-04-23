export const getDeadlineStatus = (dueDate?: string) => {
  if (!dueDate) return null;

  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 0) {
    return {
      label: "Due today",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-300",
    };
  }

  if (diffDays <= 3) {
    return {
      label: "Due soon",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-300",
    };
  }

  return null;
};
