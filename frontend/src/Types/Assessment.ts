export type AssessmentCategory =
  | "Assignment"
  | "Quiz"
  | "Exam";

export interface Assessment {
  id: string;
  title: string;
  subjectId: string;
  category: AssessmentCategory;
  maxScore: number;
  dueDate?: string;
}