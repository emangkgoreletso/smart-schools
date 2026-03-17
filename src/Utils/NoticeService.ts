import type { Notice } from "../Components/Student/NoticeCard";

/* =========================
   Helpers
   ========================= */
const today = () => new Date().toISOString().split("T")[0];

/* =========================
   TEST NOTICE
   ========================= */
export const createTestNotice = ({
  subject,
  title,
  testId,
  dueDate,
}: {
  subject: string;
  title: string;
  testId: string;
  dueDate?: string;
}): Notice => ({
  id: Date.now().toString(),
  subject,
  title: "Test Available",
  message: `${title} is now available${
    dueDate ? ` and is due on ${dueDate}.` : "."
  }`,
  type: "test",
  testId,
  targetId: testId,
  createdAt: today(),
  dueDate,
});

/* =========================
   ASSIGNMENT NOTICE
   ========================= */
export const createAssignmentNotice = ({
  subject,
  title,
  assignmentId,
  dueDate,
}: {
  subject: string;
  title: string;
  assignmentId: string;
  dueDate?: string;
}): Notice => ({
  id: Date.now().toString(),
  subject,
  title: "Assignment Uploaded",
  message: `${title} has been uploaded${
    dueDate ? ` and is due on ${dueDate}.` : "."
  }`,
  type: "assignment",
  assignmentId,
  targetId: assignmentId,
  createdAt: today(),
  dueDate,
});

/* =========================
   GENERAL / MATERIAL NOTICE
   ========================= */
export const createGeneralNotice = ({
  subject,
  title,
  message,
}: {
  subject: string;
  title: string;
  message: string;
}): Notice => ({
  id: Date.now().toString(),
  subject,
  title,
  message,
  type: "general",
  createdAt: today(),
});
