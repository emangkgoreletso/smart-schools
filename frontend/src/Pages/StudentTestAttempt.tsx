import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const StudentTestAttempt: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const durationInSeconds = 45 * 60; // 45 mins
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions: Question[] = [
    {
      id: "q1",
      question: "What is 5 × 6?",
      options: ["11", "30", "56", "60"],
    },
    {
      id: "q2",
      question: "Solve: 12 + 8 ÷ 4",
      options: ["5", "14", "16", "20"],
    },
    {
      id: "q3",
      question: "Which is a prime number?",
      options: ["9", "15", "17", "21"],
    },
  ];

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timeLeft <= 0) {
      submitTest();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const submitTest = () => {
    console.log("Submitting answers:", answers);
    alert("Test submitted successfully!");
    navigate("/student-centre");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div>
          <h2 className="font-bold text-lg text-maroon-700">
            Algebra Test
          </h2>
          <p className="text-sm text-gray-500">Test ID: {id}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Time Remaining</p>
          <p className="text-xl font-bold text-red-600">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <p className="font-medium">
              {index + 1}. {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer
                    ${
                      answers[q.id] === i
                        ? "border-maroon-700 bg-maroon-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === i}
                    onChange={() =>
                      setAnswers({ ...answers, [q.id]: i })
                    }
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-full border border-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={submitTest}
          className="px-6 py-2 rounded-full bg-maroon-700 text-white font-semibold"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default StudentTestAttempt;
