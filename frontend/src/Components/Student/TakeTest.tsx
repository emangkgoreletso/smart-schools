import React, { useState } from "react";

const TakeTest: React.FC<{
  test: any;
  onExit: () => void;
}> = ({ test, onExit }) => {
  const [answers, setAnswers] = useState<any>({});

  const handleSubmit = () => {
    alert("Test submitted successfully");
    onExit();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{test.title}</h2>
        <button
          onClick={onExit}
          className="text-sm text-gray-500 hover:underline"
        >
          Exit
        </button>
      </div>

      {test.questions.map((q: any, index: number) => (
        <div key={q.id} className="space-y-2">
          <p className="font-medium">
            {index + 1}. {q.question}
          </p>

          {q.type === "mcq" ? (
            q.options.map((opt: string, i: number) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={q.id}
                  onChange={() =>
                    setAnswers({ ...answers, [q.id]: i })
                  }
                  className="mr-2"
                />
                {opt}
              </label>
            ))
          ) : (
            <textarea
              className="w-full border rounded p-2"
              onChange={e =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-maroon-700 text-white py-3 rounded hover:bg-maroon-800"
      >
        Submit Test
      </button>
    </div>
  );
};

export default TakeTest;
