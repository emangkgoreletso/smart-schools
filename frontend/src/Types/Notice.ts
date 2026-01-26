export type NoticeType = "test" | "assignment" | "material" | "general";

export interface Notice {
  id: string;
  type: NoticeType;
  subject: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  createdAt: string;
  link?: string;
}
