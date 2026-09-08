export interface SubjectMark {
  subjectId: string;
  subjectName: string;
  teacherName: string;
  mark: number;
  grade: string;
  remark: string;
}

export interface TermReport {
  studentId: string;
  studentName: string;
  className: string;
  year: number;
  term: number;

  position: number;
  totalStudents: number;

  subjects: SubjectMark[];

  overallAverage: number;

  headTeacherRemark: string;

  issuedDate: string;
}