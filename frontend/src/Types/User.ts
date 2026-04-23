// src/types/User.ts
export type Role =
  | "student"
  | "teacher"
  | "parent"
  | "admin"
  | "superadmin"
  | "finance"
  | "leadership";

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  schoolId?: string;
  name: string; 
  
}
