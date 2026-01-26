export const tests = [
  {
    id: "t1",
    subject: "Mathematics",
    title: "Algebra Quiz",
    duration: 30,
    totalMarks: 20,
    status: "not_started", // not_started | in_progress | submitted
    dueDate: "2026-01-20",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What is 2x + 3 = 7?",
        options: ["x = 1", "x = 2", "x = 3", "x = 4"],
        correct: 1,
      },
      {
        id: "q2",
        type: "short",
        question: "Define a linear equation.",
      },
    ],
  },
];
