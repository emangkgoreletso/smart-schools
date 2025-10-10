import React, { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Test, TestQuestion } from "../Types/Test";

interface TestFormProps {
  onSubmit: (test: Test) => void;
  initialData?: Test;
}

const TestForm: React.FC<TestFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [questions, setQuestions] = useState<TestQuestion[]>(
    initialData?.questions || [
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]
  );

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectOptionChange = (qIndex: number, value: number) => {
    const updated = [...questions];
    updated[qIndex].correctOption = value;
    setQuestions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const testData: Test = { title, description, questions };
    onSubmit(testData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-md mt-6 border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-4 text-maroon-700">
        {initialData ? "Edit Test" : "Create New Test"}
      </h2>

      {/* Test Info */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>

      {/* Questions Section */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">
                Question {qIndex + 1}
              </h3>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(qIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>

            <input
              type="text"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, e.target.value)
              }
              placeholder="Enter question text..."
              className="w-full p-2 border rounded-md mb-3"
            />

            {/* Options */}
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctOption === oIndex}
                    onChange={() =>
                      handleCorrectOptionChange(qIndex, oIndex)
                    }
                    className="accent-maroon-600"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${oIndex + 1}`}
                    className="flex-1 p-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <button
        type="button"
        onClick={handleAddQuestion}
        className="mt-6 flex items-center text-maroon-700 font-semibold hover:text-maroon-900"
      >
        <Plus className="w-5 h-5 mr-2" /> Add Question
      </button>

      {/* Submit */}
      <button
        type="submit"
        className="mt-6 w-full bg-maroon-700 hover:bg-maroon-800 text-white py-2 rounded-md font-semibold transition"
      >
        {initialData ? "Update Test" : "Create Test"}
      </button>
    </form>
  );
};

export default TestForm;
