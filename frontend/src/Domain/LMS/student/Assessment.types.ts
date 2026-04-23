export type AssessmentType = "Assignment" | "Quiz" | "Test" | "Classwork";

export type AssessmentStatus =
  | "Pending"
  | "Submitted"
  | "Graded"
  | "Overdue";

export interface Assessment {
  id: string;
  subjectId: string;

  title: string;
  description?: string;

  type: AssessmentType;

  dueDate: string;

  maxScore: number;

  status: AssessmentStatus;
}