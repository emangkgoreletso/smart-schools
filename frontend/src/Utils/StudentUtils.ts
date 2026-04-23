export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admission: string;
}

export const getFullName = (s: Student) =>
  `${s.firstName} ${s.lastName}`;