export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string; // optional for responses
  role: "Student" | "Teacher" | "Parent" | "Admin";
  createdAt?: string;
}
