export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  teacherId: number;
  courseName: string;
  attachmentUrl?: string;
}
