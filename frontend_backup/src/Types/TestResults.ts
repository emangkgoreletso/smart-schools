export interface TestQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface Test {
  id: number;
  title: string;
  subject: string;
  totalMarks: number;
  durationMinutes: number;
  createdByTeacherId: number;
  questions: TestQuestion[];
}
