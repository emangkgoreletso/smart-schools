export interface Admission {
  id: number;
  studentName: string;
  guardianName: string;
  guardianContact: string;
  gradeLevel: string;
  previousSchool?: string;
  admissionStatus: "Pending" | "Approved" | "Rejected";
  applicationDate: string;
}
