export type AssignmentStatus =
  | "new"
  | "pending"
  | "submitted"
  | "marked"
  | "overdue";

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
  grade?: number;
  briefUrl: string;
  submissionUrl?: string;
}