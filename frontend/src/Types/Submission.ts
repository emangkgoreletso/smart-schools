export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  filePath: string;
  submittedAt: string;
  status: string;
  grade?: number;
}
