export type NoticeType =
  | "assignment"
  | "test"
  | "material"
  | "general";

export interface Notice {
  id: string;
  subject: string;
  title: string;
  message: string;
  type: NoticeType;
  createdAt: string;

  // ✅ Optional metadata
  testId?: string;
  assignmentId?: string;
  targetId?: string;
}

export const notices: Notice[] = [
  {
    id: "1",
    subject: "Mathematics",
    title: "New Test Available",
    message: "Algebra Test is now available.",
    type: "test",
    testId: "math-test-1",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    subject: "Biology",
    title: "Test Announcement",
    message: "Chapter 3 test next week.",
    type: "test",
    createdAt: "2024-10-13",
  },
  {
    id: "3",
    subject: "History",
    title: "New Materials Uploaded",
    message: "Slides for Chapter 4 are now available.",
    type: "material",
    createdAt: "2024-10-14",
  },
  {
    id: "4",
    subject: "General",
    title: "School Assembly",
    message: "Assembly on Monday at 9 AM.",
    type: "general",
    createdAt: "2024-10-15",
  },
];
