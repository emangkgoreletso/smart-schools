export interface StudentPerformance {
  subjectId: string;
  studentId: string;

  overallAverage: number;
  assignmentAverage: number;
  testAverage: number;

  rank?: number;
  classAverage?: number;
}