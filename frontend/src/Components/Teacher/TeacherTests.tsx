import React, { useState } from "react";
import { SubjectProps } from "../../Types/SubjectProps";

interface Quiz {
  id: string;
  title: string;
  questions: number;
}

const TeacherTests: React.FC<SubjectProps> = ({ subjectId }) => {

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [title, setTitle] = useState("");

  const createQuiz = () => {
    if (!title) return;

    const quiz: Quiz = {
      id: Date.now().toString(),
      title,
      questions: 0,
    };

    setQuizzes([...quizzes, quiz]);
    setTitle("");
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-xl font-bold">
        Tests & Quizzes – Subject {subjectId}
      </h2>

      {/* Create Quiz */}
      <div className="border p-4 rounded space-y-2">
        <input
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={createQuiz}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </div>

      {/* Quiz List */}
      <ul className="space-y-2">
        {quizzes.map((q) => (
          <li key={q.id} className="border p-3 rounded">
            <div className="font-semibold">{q.title}</div>
            <div className="text-sm text-gray-500">
              Questions: {q.questions}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default TeacherTests;