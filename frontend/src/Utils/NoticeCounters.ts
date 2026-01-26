import { Notice } from "../Components/Student/MockNotices";

export const countNoticesByType = (notices: Notice[]) => {
  return notices.reduce(
    (acc, notice) => {
      acc[notice.type] += 1;
      return acc;
    },
    {
      assignment: 0,
      test: 0,
      material: 0,
      general: 0,
    }
  );
};
