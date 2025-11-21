import React, { useState } from "react";
import { Test } from "../Types/Test";
import { CheckCircle, XCircle } from "lucide-react";

interface TakeTestProps {
  test: Test;
  onSubmit: (answers: number[]) => void;
}

const TakeTest: React.FC<TakeTestProps> = ({ test, onSubmit }) => {
  const [answers, setAnswers] = useState<number[]>(
    new Array(test.questions.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex: number, oIndex: number) => {
    const updated = [...answers];
    updated[qIndex] = oIndex;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (answers.includes(-1)) {
      alert("Please answer all questions before submitting!");
      return;
    }
    setSubmitted(true);
    onSubmit(answers);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-maroon-700 mb-4">{test.title}</h2>
      <p className="text-gray-600 mb-6">{test.description}</p>

      {test.questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="mb-6 p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow transition"
        >
          <p className="font-semibold text-gray-800 mb-3">
            {qIndex + 1}. {q.questionText}
          </p>

          <div className="space-y-2">
            {q.options.map((opt, oIndex) => {
              const isCorrect = oIndex === q.correctOption;
              const isSelected = answers[qIndex] === oIndex;

              return (
                <label
                  key={oIndex}
                  className={`flex items-center p-2 border rounded-md cursor-pointer transition ${
                    isSelected
                      ? "bg-maroon-100 border-maroon-600"
                      : "border-gray-200 hover:border-maroon-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${qIndex}`}
                    checked={isSelected}
                    onChange={() => handleOptionChange(qIndex, oIndex)}
                    className="accent-maroon-700 mr-2"
                    disabled={submitted}
                  />
                  <span>{opt}</span>

                  {submitted && (
                    <span className="ml-auto">
                      {isCorrect ? (
                        <CheckCircle
                          size={18}
                          className="text-green-600 inline-block"
                        />
                      ) : isSelected ? (
                        <XCircle
                          size={18}
                          className="text-red-500 inline-block"
                        />
                      ) : null}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full bg-maroon-700 hover:bg-maroon-800 text-white py-2 rounded-md font-semibold transition"
        >
          Submit Test
        </button>
      ) : (
        <div className="text-center mt-4">
          <p className="text-green-700 font-semibold">Test submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default TakeTest;
