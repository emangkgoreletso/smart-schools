export type NoticeType =
  | "assignment"
  | "test"
  | "material"
  | "general";

export interface Notice {
  id: string;
  subject: string;
  title: string;
  message: string;

  type: NoticeType;

  createdAt: string;

  dueDate?: string;

  targetId?: string;

  assignmentId?: string;

  testId?: string;
}