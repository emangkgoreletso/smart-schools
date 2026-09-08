import React, { useEffect, useState } from "react";

import {
  TestResult,
} from "../../../Domain/LMS";

/* =========================
TYPES (LOCAL UI ONLY)
========================= */

interface Question {
  id: string;
  question: string;
  type: "MCQ" | "Short";
  options?: string[];
  correctAnswer: string;
}

interface Test {
  id: string;
  title: string;
  duration: number; // minutes
  questions: Question[];
}

interface Props {
  subjectId: string;
  studentId?: string;
}

/* =========================
MOCK DATA (replace with API later)
========================= */

const testsFromTeacher: Test[] = [
  {
    id: "t1",
    title: "Algebra Basics Test",
    duration: 10,
    questions: [
      {
        id: "q1",
        question: "Solve: 2x + 3 = 7",
        type: "Short",
        correctAnswer: "2",
      },
      {
        id: "q2",
        question: "What is x if x² = 9?",
        type: "MCQ",
        options: ["1", "3", "6", "9"],
        correctAnswer: "3",
      },
    ],
  },
];

/* =========================
COMPONENT
========================= */

const StudentTests: React.FC<Props> = ({ subjectId }) => {
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState<TestResult | null>(null);

  /* =========================
  START TEST
  ========================= */

  const startTest = (test: Test) => {
    setActiveTest(test);
    setAnswers({});
    setResults(null);
    setTimeLeft(test.duration * 60);
  };

  /* =========================
  TIMER
  ========================= */

  useEffect(() => {
    if (!activeTest || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && activeTest) {
      submitTest();
    }
  }, [timeLeft]);

  /* =========================
  ANSWERS
  ========================= */

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  /* =========================
  SUBMIT TEST
  ========================= */

  const submitTest = () => {
    if (!activeTest) return;

    let score = 0;

    activeTest.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    setResults({
      testId: activeTest.id,
      score,
      total: activeTest.questions.length,
    });

    setActiveTest(null);
  };

  /* =========================
  FORMAT TIME
  ========================= */

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* =========================
  TEST LIST VIEW
  ========================= */

  if (!activeTest) {
    return (
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-xl font-bold text-maroon-700">
            Tests
          </h2>
          <p className="text-sm text-gray-600">
            Complete your subject assessments
          </p>
        </div>

        {/* TEST LIST */}
        <div className="space-y-4">

          {testsFromTeacher.map((test) => (
            <div
              key={test.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-maroon-700">
                  {test.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Duration: {test.duration} mins | Questions:{" "}
                  {test.questions.length}
                </p>
              </div>

              <button
                onClick={() => startTest(test)}
                className="bg-maroon-700 text-white px-4 py-2 rounded"
              >
                Start Test
              </button>
            </div>
          ))}

        </div>

        {/* RESULTS */}
        {results && (
          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-green-700">
              Test Completed
            </h3>

            <p>
              Score: {results.score} / {results.total}
            </p>
          </div>
        )}

      </div>
    );
  }

  /* =========================
  ACTIVE TEST VIEW
  ========================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-maroon-700">
          {activeTest.title}
        </h2>

        <div className="text-red-600 font-semibold">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-6">

        {activeTest.questions.map((q, index) => (
          <div
            key={q.id}
            className="border rounded-lg p-4 space-y-3"
          >
            <h4 className="font-semibold">
              {index + 1}. {q.question}
            </h4>

            {/* MCQ */}
            {q.type === "MCQ" && q.options && (
              <div className="space-y-2">

                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={(e) =>
                        updateAnswer(q.id, e.target.value)
                      }
                    />
                    {opt}
                  </label>
                ))}

              </div>
            )}

            {/* SHORT ANSWER */}
            {q.type === "Short" && (
              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) =>
                  updateAnswer(q.id, e.target.value)
                }
                className="border px-3 py-2 rounded w-full"
                placeholder="Type your answer"
              />
            )}

          </div>
        ))}

      </div>

      {/* SUBMIT */}
      <button
        onClick={submitTest}
        className="bg-maroon-700 text-white px-6 py-2 rounded"
      >
        Submit Test
      </button>

    </div>
  );
};

export default StudentTests;