import React, { useEffect, useState } from "react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

interface OnlineQuizShellProps {
  quizId: string;
  title: string;
  subject: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

const OnlineQuizShell: React.FC<OnlineQuizShellProps> = ({
  quizId,
  title,
  subject,
  durationMinutes,
  questions,
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [submitted, setSubmitted] = useState(false);

  /* Countdown timer */
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    console.log("Quiz submitted:", {
      quizId,
      answers,
    });
    setSubmitted(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{subject}</p>
        </div>

        <div className="text-sm font-medium text-red-600">
          Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Submitted Message */}
      {submitted && (
        <div className="rounded border border-green-300 bg-green-50 p-4 text-green-700">
          Quiz submitted successfully.
        </div>
      )}

      {/* Questions */}
      {!submitted && (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="border rounded p-4 space-y-3">
              <p className="font-medium">
                {index + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === i}
                      onChange={() => handleSelect(q.id, i)}
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineQuizShell;
