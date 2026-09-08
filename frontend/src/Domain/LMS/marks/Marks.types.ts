export interface StudentMark {
  studentId: string;

  assessmentId: string;

  marksObtained: number;
}

export interface SubjectResult {
  studentId: string;

  subjectId: string;

  average: number;

  grade: string;
}

export interface TermResult {
  studentId: string;

  classId: string;

  subjectResults: SubjectResult[];

  overallAverage: number;

  position: number;
}