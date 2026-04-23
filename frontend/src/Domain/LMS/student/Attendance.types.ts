export interface AttendanceRecord {
  id: string;
  subjectId: string;
  studentId: string;

  date: string;
  status: "Present" | "Absent" | "Late" | "Excused";
}