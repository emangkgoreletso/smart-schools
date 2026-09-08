export interface ReportSubject {
  subjectId: string;
  subjectName: string;
  marks: number;
  grade: string;
  teacherRemark?: string;
}

export interface TermReport {
  id: string;
  studentId: string;
  className: string;
  year: number;
  term: 1 | 2 | 3;
  position: number;

  subjects: ReportSubject[];

  headTeacherRemark?: string;

  generatedDate: string;
}