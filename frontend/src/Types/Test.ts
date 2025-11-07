// src/types/Test.ts
export interface TestQuestion {
  questionText: string;
  options: string[];
  correctOption: number;
}

export interface Test {
  id?: number;
  title: string;
  description: string;
  questions: TestQuestion[];
  
}

export interface TestResult {
  id: number;
  studentId: number;
  testId: number;
  score: number;
  grade: string;
  feedback?: string;
  dateTaken: string;
  testTitle?: string;
  passed?: boolean;
}
