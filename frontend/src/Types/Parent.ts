import { User } from "./User";
import { Student } from "./Student";

export interface Parent extends User {
  children: Student[];
  address?: string;
  phoneNumber?: string;
  occupation?: string;
}
