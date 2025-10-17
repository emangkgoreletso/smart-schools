import { User } from "./User";

export interface Teacher extends User {
  staffId: string;
  subjectSpecialization: string;
  classAssigned?: string;
  department?: string;
}
