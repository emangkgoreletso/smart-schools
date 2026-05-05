export interface StudentLink {
  parentId: string;
  studentId: string;
  relationship: "Father" | "Mother" | "Guardian";
}