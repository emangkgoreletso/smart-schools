import React, { useState } from "react";

type Term = "Term 1" | "Term 2" | "Term 3" | "Year";

interface Props {
  students: {
    id: string;
    name: string;
  }[];

  assignments: {
    id: string;
    title: string;
    category: "Assignment" | "Quiz" | "Exam";
    term?: Term;
  }[];

  grades: {
    studentId: string;
    assignmentId: string;
    score: number;
  }[];
}

type Tab = "class" | "students";

const TeacherReports: React.FC<Props> = ({
  students,
  assignments,
  grades,
}) => {

  const [activeTab, setActiveTab] = useState<Tab>("class");
  const [term, setTerm] = useState<Term>("Year");
  const [selectedStudent, setSelectedStudent] =
    useState<string | null>(null);

  /* FILTER ASSIGNMENTS BY TERM */

  const filteredAssignments =
    term === "Year"
      ? assignments
      : assignments.filter((a) => a.term === term);

  const getScore = (studentId: string, assignmentId: string) => {
    return (
      grades.find(
        (g) =>
          g.studentId === studentId &&
          g.assignmentId === assignmentId
      )?.score || 0
    );
  };

  const studentAverage = (studentId: string) => {
    if (!filteredAssignments.length) return 0;

    let total = 0;

    filteredAssignments.forEach((a) => {
      total += getScore(studentId, a.id);
    });

    return Math.round(total / filteredAssignments.length);
  };

  const classAverage = () => {
    let total = 0;

    students.forEach((s) => {
      total += studentAverage(s.id);
    });

    return Math.round(total / students.length);
  };

  const passRate = () => {
    let passes = 0;

    students.forEach((s) => {
      if (studentAverage(s.id) >= 50) passes++;
    });

    return Math.round((passes / students.length) * 100);
  };

  const bestStudent = () => {
    let best = { name: "", score: 0 };

    students.forEach((s) => {
      const avg = studentAverage(s.id);

      if (avg > best.score) {
        best = { name: s.name, score: avg };
      }
    });

    return best;
  };

  /* TOP 10 */

  const topStudents = [...students]
    .map((s) => ({
      name: s.name,
      avg: studentAverage(s.id),
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10);

  /* AT RISK */

  const atRisk = students.filter(
    (s) => studentAverage(s.id) < 50
  );

  /* GRADE DISTRIBUTION */

  const gradeBands = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };

  students.forEach((s) => {
    const avg = studentAverage(s.id);

    if (avg >= 80) gradeBands.A++;
    else if (avg >= 70) gradeBands.B++;
    else if (avg >= 60) gradeBands.C++;
    else if (avg >= 50) gradeBands.D++;
    else gradeBands.F++;
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Class Reports
        </h2>
      </div>

      {/* TERM FILTER */}

      <div className="flex gap-2 flex-wrap">

        {["Term 1", "Term 2", "Term 3", "Year"].map((t) => (
          <button
            key={t}
            onClick={() => setTerm(t as Term)}
            className={`px-3 py-1 rounded-full border text-sm
            ${
              term === t
                ? "bg-maroon-700 text-white"
                : "border-maroon-700 text-maroon-700"
            }`}
          >
            {t}
          </button>
        ))}

      </div>

      {/* TAB SWITCH */}

      <div className="flex gap-3">

        <button
          onClick={() => setActiveTab("class")}
          className={`px-4 py-2 rounded-full border text-sm
          ${
            activeTab === "class"
              ? "bg-maroon-700 text-white"
              : "border-maroon-700 text-maroon-700"
          }`}
        >
          Class Analytics
        </button>

        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-full border text-sm
          ${
            activeTab === "students"
              ? "bg-maroon-700 text-white"
              : "border-maroon-700 text-maroon-700"
          }`}
        >
          Student Reports
        </button>

      </div>

      {/* CLASS ANALYTICS */}

      {activeTab === "class" && (
        <div className="space-y-6">

          {/* KPI */}

          <div className="grid md:grid-cols-3 gap-4">

            <KPI title="Class Average" value={`${classAverage()}%`} />

            <KPI title="Pass Rate" value={`${passRate()}%`} />

            <KPI
              title="Best Student"
              value={`${bestStudent().name} (${bestStudent().score}%)`}
            />

          </div>

          {/* TOP STUDENTS */}

          <Section title="Top 10 Students">

            {topStudents.map((s, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2"
              >
                <span>{i + 1}. {s.name}</span>
                <span className="font-semibold">{s.avg}%</span>
              </div>
            ))}

          </Section>

          {/* AT RISK */}

          <Section title="At-Risk Students">

            {atRisk.length === 0 && (
              <p className="text-sm text-gray-500">
                No students at risk.
              </p>
            )}

            {atRisk.map((s) => (
              <div
                key={s.id}
                className="flex justify-between border-b py-2"
              >
                <span>{s.name}</span>
                <span className="text-red-600 font-semibold">
                  {studentAverage(s.id)}%
                </span>
              </div>
            ))}

          </Section>

          {/* GRADE DISTRIBUTION */}

          <Section title="Grade Distribution">

            {Object.entries(gradeBands).map(([grade, count]) => (
              <div
                key={grade}
                className="flex justify-between border-b py-2"
              >
                <span>Grade {grade}</span>
                <span>{count} students</span>
              </div>
            ))}

          </Section>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-maroon-700 text-white rounded"
          >
            Print Class Report
          </button>

        </div>
      )}

      {/* STUDENT REPORT */}

      {activeTab === "students" && (
        <div className="space-y-4">

          <select
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option>Select Student</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}

          </select>

          {selectedStudent && (
            <table className="w-full text-sm">

              <thead className="bg-gray-100">

                <tr>
                  <th className="p-2 text-left">Assessment</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Score</th>
                </tr>

              </thead>

              <tbody>

                {filteredAssignments.map((a) => (
                  <tr key={a.id} className="border-t">

                    <td className="p-2">{a.title}</td>

                    <td className="p-2 text-center">
                      {a.category}
                    </td>

                    <td className="p-2 text-center">
                      {getScore(selectedStudent, a.id)}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>
      )}

    </div>
  );
};

export default TeacherReports;


/* SMALL COMPONENTS */

const KPI: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="bg-white shadow rounded p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold text-maroon-700">{value}</p>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white shadow rounded p-4">
    <h3 className="font-semibold text-maroon-700 mb-3">
      {title}
    </h3>
    {children}
  </div>
);