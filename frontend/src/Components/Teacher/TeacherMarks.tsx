import React, { useState } from "react";
import { SubjectProps } from "../../Types/SubjectProps";

/* ===============================
DATA MODELS
=============================== */

interface Assignment {
  id: number;
  title: string;
  category: "Assignment" | "Quiz" | "Exam";
  maxScore: number;
}

interface Student {
  id: number;
  name: string;
}

interface Grade {
  studentId: number;
  assignmentId: number;
  score: number;
}

/* ===============================
MOCK DATA
=============================== */

const initialStudents: Student[] = [
  { id: 1, name: "Neo Dlamini" },
  { id: 2, name: "Naledi Motsamai" },
  { id: 3, name: "Kabelo Sechele" },
  { id: 4, name: "Thabo Molefe" },
];

const initialAssignments: Assignment[] = [
  { id: 1, title: "Assignment 1", category: "Assignment", maxScore: 100 },
  { id: 2, title: "Quiz 1", category: "Quiz", maxScore: 100 },
  { id: 3, title: "Midterm", category: "Exam", maxScore: 100 },
];

const initialGrades: Grade[] = [];

/* ===============================
CATEGORY WEIGHTS
=============================== */

const CATEGORY_WEIGHTS = {
  Assignment: 0.3,
  Quiz: 0.3,
  Exam: 0.4,
};

/* ===============================
COMPONENT
=============================== */

const TeacherMarks: React.FC<SubjectProps> = ({ subjectId }) => {
  const [students] = useState<Student[]>(initialStudents);
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<
    "Assignment" | "Quiz" | "Exam"
  >("Assignment");

  /* ===============================
  UPDATE SCORE
  =============================== */

  const updateScore = (
    studentId: number,
    assignmentId: number,
    score: number
  ) => {
    setGrades((prev) => {
      const existing = prev.find(
        (g) =>
          g.studentId === studentId &&
          g.assignmentId === assignmentId
      );

      if (existing) {
        return prev.map((g) =>
          g.studentId === studentId &&
          g.assignmentId === assignmentId
            ? { ...g, score }
            : g
        );
      }

      return [...prev, { studentId, assignmentId, score }];
    });
  };

  /* ===============================
  GET SCORE
  =============================== */

  const getScore = (studentId: number, assignmentId: number) => {
    return (
      grades.find(
        (g) =>
          g.studentId === studentId &&
          g.assignmentId === assignmentId
      )?.score ?? 0
    );
  };

  /* ===============================
  FINAL GRADE CALCULATION
  =============================== */

  const calculateFinal = (studentId: number) => {
    let totals = {
      Assignment: 0,
      Quiz: 0,
      Exam: 0,
    };

    let counts = {
      Assignment: 0,
      Quiz: 0,
      Exam: 0,
    };

    assignments.forEach((a) => {
      const score = getScore(studentId, a.id);

      totals[a.category] += score;
      counts[a.category]++;
    });

    let weightedTotal = 0;

    Object.keys(totals).forEach((cat) => {
      const category = cat as keyof typeof totals;

      if (counts[category] > 0) {
        const avg = totals[category] / counts[category];

        weightedTotal += avg * CATEGORY_WEIGHTS[category];
      }
    });

    return Math.round(weightedTotal);
  };

  /* ===============================
  LETTER GRADE
  =============================== */

  const letter = (score: number) => {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  /* ===============================
  RANKING
  =============================== */

  const ranking = [...students]
    .map((s) => ({
      ...s,
      final: calculateFinal(s.id),
    }))
    .sort((a, b) => b.final - a.final);

  const getRank = (studentId: number) =>
    ranking.findIndex((r) => r.id === studentId) + 1;

  /* ===============================
  CREATE ASSIGNMENT
  =============================== */

  const createAssignment = () => {
    if (!newTitle.trim()) return;

    const newAssignment: Assignment = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      maxScore: 100,
    };

    setAssignments((prev) => [...prev, newAssignment]);
    setNewTitle("");
  };

  /* ===============================
  CLASS STATS
  =============================== */

  const classAverage =
    students.length > 0
      ? students.reduce((acc, s) => acc + calculateFinal(s.id), 0) /
        students.length
      : 0;

  const passRate =
    students.length > 0
      ? (students.filter((s) => calculateFinal(s.id) >= 50).length /
          students.length) *
        100
      : 0;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-maroon-700">
          📊 Advanced Gradebook
        </h2>
        <p className="text-sm text-gray-600">
          Dynamic LMS gradebook with weighted grading
        </p>
      </div>

      {/* CLASS ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard title="Students" value={students.length.toString()} />
        <StatCard title="Assignments" value={assignments.length.toString()} />
        <StatCard title="Class Average" value={classAverage.toFixed(1) + "%"} />
        <StatCard title="Pass Rate" value={passRate.toFixed(0) + "%"} />

      </div>

      {/* CREATE ASSIGNMENT */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-3 flex-wrap">

        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Assignment name"
          className="border rounded px-3 py-2"
        />

        <select
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value as any)
          }
          className="border rounded px-3 py-2"
        >
          <option>Assignment</option>
          <option>Quiz</option>
          <option>Exam</option>
        </select>

        <button
          onClick={createAssignment}
          className="bg-maroon-700 text-white px-4 py-2 rounded-full"
        >
          Add Column
        </button>

      </div>

      {/* GRADEBOOK TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Student</th>

              {assignments.map((a) => (
                <th key={a.id} className="p-3 text-left">
                  {a.title}
                </th>
              ))}

              <th className="p-3 text-left">Final</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Rank</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => {
              const final = calculateFinal(student.id);

              return (
                <tr key={student.id} className="border-t">

                  <td className="p-3 font-medium">
                    {student.name}
                  </td>

                  {assignments.map((a) => (
                    <td key={a.id} className="p-3">

                      <input
                        type="number"
                        value={getScore(student.id, a.id)}
                        onChange={(e) =>
                          updateScore(
                            student.id,
                            a.id,
                            Number(e.target.value)
                          )
                        }
                        className="border rounded px-2 py-1 w-20"
                      />

                    </td>
                  ))}

                  <td className="p-3 font-bold text-maroon-700">
                    {final}%
                  </td>

                  <td className="p-3">{letter(final)}</td>

                  <td className="p-3">#{getRank(student.id)}</td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

/* ===============================
STAT CARD
=============================== */

const StatCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold text-maroon-700">{value}</p>
  </div>
);

export default TeacherMarks;