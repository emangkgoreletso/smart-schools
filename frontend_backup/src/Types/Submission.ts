export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  filePath: string;
  submittedAt: string;
  status: string;
  grade?: number;
}
export interface StudentSubmission {
  id: number;
  studentId: number;
  assignmentId: number;
  fileUrl: string;
  dateSubmitted: string;
  grade?: string;
  filePath: string;
  status: string;
    submittedAt: string;
}

