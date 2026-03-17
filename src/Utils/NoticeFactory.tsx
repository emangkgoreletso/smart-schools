import type { Notice } from "../Components/Student/NoticeCard";


export const createTestNotice = ({
  subject,
  title,
  testId,
}: {
  subject: string;
  title: string;
  testId: string;
}): Notice => ({
  id: Date.now().toString(),
  subject,
  title: "Test Available",
  message: `${title} is now available.`,
  type: "test",
  testId, // ✅ matches NoticeCard
  createdAt: new Date().toISOString().split("T")[0],
});
