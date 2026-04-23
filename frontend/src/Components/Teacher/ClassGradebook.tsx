import React, { useState, useMemo } from "react";

/* =========================================
TYPES
========================================= */

type Category =
  | "Assignment"
  | "Quiz"
  | "Exam"
  | "Classwork";

interface Student {
  id: string;
  name: string;
  admission: string;
}

interface Assessment {
  id: string;
  title: string;
  category: Category;
  maxScore: number;
  date: string;
  term?: "Term 1" | "Term 2" | "Term 3";
}

interface Grade {
  studentId: string;
  assessmentId: string;
  score: number;
  comment?: string;
}

interface Props {
  students: Student[];

  // optional LMS context (future API integration)
  subjectId?: string;
  classId?: string;
  className?: string;
}

/* =========================================
HELPERS
========================================= */

const gradeColor = (value: number) => {
  if (value >= 75) return "text-green-600";
  if (value >= 50) return "text-yellow-600";
  return "text-red-600";
};

/* =========================================
COMPONENT
========================================= */

const ClassGradebook: React.FC<Props> = ({
  students,
  subjectId,
  classId,
  className,
}) => {
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: "a1",
      title: "Assignment 1",
      category: "Assignment",
      maxScore: 100,
      date: "2026-04-10",
      term: "Term 1",
    },
    {
      id: "q1",
      title: "Quiz 1",
      category: "Quiz",
      maxScore: 20,
      date: "2026-04-12",
      term: "Term 1",
    },
  ]);

  const [grades, setGrades] = useState<Grade[]>([]);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
    useState<Category | "All">("All");

  const [termFilter, setTermFilter] =
    useState<"All" | "Term 1" | "Term 2" | "Term 3">("All");

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] =
    useState<Category>("Assignment");
  const [newMaxScore, setNewMaxScore] = useState(100);

  /* =========================================
  FILTERED STUDENTS
  ========================================= */

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

  /* =========================================
  FILTERED ASSESSMENTS
  ========================================= */

  const visibleAssessments = useMemo(() => {
    return assessments.filter((a) => {
      const categoryOk =
        filterCategory === "All" || a.category === filterCategory;

      const termOk =
        termFilter === "All" || a.term === termFilter;

      return categoryOk && termOk;
    });
  }, [assessments, filterCategory, termFilter]);

  /* =========================================
  GRADES
  ========================================= */

  const updateScore = (
    studentId: string,
    assessmentId: string,
    score: number
  ) => {
    setGrades((prev) => {
      const existing = prev.find(
        (g) =>
          g.studentId === studentId &&
          g.assessmentId === assessmentId
      );

      if (existing) {
        return prev.map((g) =>
          g.studentId === studentId &&
          g.assessmentId === assessmentId
            ? { ...g, score }
            : g
        );
      }

      return [
        ...prev,
        { studentId, assessmentId, score },
      ];
    });
  };

  const getScore = (studentId: string, assessmentId: string) =>
    grades.find(
      (g) =>
        g.studentId === studentId &&
        g.assessmentId === assessmentId
    )?.score ?? "";

  /* =========================================
  CALCULATIONS
  ========================================= */

  const calculateAverage = (studentId: string) => {
    const scores = assessments.map((a) => {
      const g = grades.find(
        (x) =>
          x.studentId === studentId &&
          x.assessmentId === a.id
      );
      return g?.score ?? 0;
    });

    if (!scores.length) return 0;

    return Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
  };

  /* =========================================
  ANALYTICS
  ========================================= */

  const ranked = useMemo(() => {
    return [...students]
      .map((s) => ({
        ...s,
        avg: calculateAverage(s.id),
      }))
      .sort((a, b) => b.avg - a.avg);
  }, [students, grades]);

  const top10 = ranked.slice(0, 10);
  const atRisk = ranked.filter((s) => s.avg < 50);

  const distribution = useMemo(() => {
    const d = { A: 0, B: 0, C: 0, D: 0, F: 0 };

    ranked.forEach((s) => {
      if (s.avg >= 75) d.A++;
      else if (s.avg >= 65) d.B++;
      else if (s.avg >= 50) d.C++;
      else if (s.avg >= 40) d.D++;
      else d.F++;
    });

    return d;
  }, [grades]);

  /* =========================================
  CREATE ASSESSMENT
  ========================================= */

  const createAssessment = () => {
    if (!newTitle) return;

    setAssessments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTitle,
        category: newCategory,
        maxScore: newMaxScore,
        date: new Date().toISOString().split("T")[0],
        term: "Term 1",
      },
    ]);

    setNewTitle("");
  };

  /* =========================================
  UI
  ========================================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          {className || "Class"} Gradebook
        </h2>

        <p className="text-sm text-gray-600">
          Subject: {subjectId || "N/A"} | Class: {classId || "N/A"}
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">

        <input
          placeholder="Search student"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value as any)
          }
          className="border px-3 py-2 rounded"
        >
          <option>All</option>
          <option>Assignment</option>
          <option>Quiz</option>
          <option>Exam</option>
          <option>Classwork</option>
        </select>

        <select
          value={termFilter}
          onChange={(e) =>
            setTermFilter(e.target.value as any)
          }
          className="border px-3 py-2 rounded"
        >
          <option>All</option>
          <option>Term 1</option>
          <option>Term 2</option>
          <option>Term 3</option>
        </select>
      </div>

      {/* CREATE */}
      <div className="flex flex-wrap gap-2">

        <input
          placeholder="Assessment name"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value as Category)
          }
          className="border px-3 py-2 rounded"
        >
          <option>Assignment</option>
          <option>Quiz</option>
          <option>Exam</option>
          <option>Classwork</option>
        </select>

        <input
          type="number"
          value={newMaxScore}
          onChange={(e) =>
            setNewMaxScore(Number(e.target.value))
          }
          className="border px-3 py-2 rounded w-24"
        />

        <button
          onClick={createAssessment}
          className="bg-maroon-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Student</th>

              {visibleAssessments.map((a) => (
                <th key={a.id} className="p-2">
                  {a.title}
                </th>
              ))}

              <th className="p-2">Avg</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => {
              const avg = calculateAverage(s.id);

              return (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.name}</td>

                  {visibleAssessments.map((a) => (
                    <td key={a.id} className="p-2">
                      <input
                        className="border w-16 px-1"
                        type="number"
                        value={getScore(s.id, a.id)}
                        onChange={(e) =>
                          updateScore(
                            s.id,
                            a.id,
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                  ))}

                  <td className={`p-2 font-bold ${gradeColor(avg)}`}>
                    {avg}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ANALYTICS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="border p-3 rounded">
          <h3 className="font-bold">Top 10</h3>
          {top10.map((s, i) => (
            <p key={i}>
              {i + 1}. {s.name} ({s.avg}%)
            </p>
          ))}
        </div>

        <div className="border p-3 rounded">
          <h3 className="font-bold text-red-600">
            At Risk
          </h3>
          {atRisk.map((s) => (
            <p key={s.id}>
              {s.name} ({s.avg}%)
            </p>
          ))}
        </div>

        <div className="border p-3 rounded">
          <h3 className="font-bold">Distribution</h3>
          {Object.entries(distribution).map(([k, v]) => (
            <p key={k}>
              {k}: {v}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ClassGradebook;