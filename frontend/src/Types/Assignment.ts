// src/Types/Assignment.ts
export interface Assignment {
  id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  teacherId?: number;
  courseId?: number;
  filePath?: string;
  summary?: string;
  createdAt?: string;
  updatedAt?: string;
}
