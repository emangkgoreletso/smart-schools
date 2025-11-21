import { User } from "./User";

export interface Student extends User {
  studentNumber: string;
  gradeLevel: string;
  className: string;
  guardianName?: string;
  guardianContact?: string;
}
