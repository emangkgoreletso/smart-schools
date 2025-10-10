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
