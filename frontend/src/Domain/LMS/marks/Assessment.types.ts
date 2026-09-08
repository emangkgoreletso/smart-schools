export type AssessmentType =
  | "Assignment"
  | "Quiz"
  | "Classwork"
  | "Test"
  | "Exam";

export interface Assessment {
  id: string;

  subjectId: string;

  classId: string;

  title: string;

  type: AssessmentType;

  totalMarks: number;

  weight: number;

  date: string;
}