import React, { useEffect } from "react";
import TestsList from "../Components/Student/TestsList";
import { createTestNotice } from "../Utils/NoticeFactory";
import { notices } from "../Components/Student/MockNotices";

const TestsPage: React.FC = () => {
  useEffect(() => {
    // TEMP: mirror test data until backend exists
    const tests = [
      {
        id: "1",
        subject: "Mathematics",
        title: "Algebra Test",
        status: "available",
      },
      {
        id: "2",
        subject: "Biology",
        title: "Photosynthesis Quiz",
        status: "upcoming",
      },
    ];

    tests.forEach((test) => {
      if (test.status !== "available") return;

      const exists = notices.some(
        (n) => n.type === "test" && n.title === test.title
      );

      if (!exists) {
        notices.unshift(
          createTestNotice({
            subject: test.subject,
            title: test.title,
            testId: test.id,
          })
        );
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-maroon-700">
        Online Tests & Quizzes
      </h2>

      <TestsList />
    </div>
  );
};

export default TestsPage;
