import React, { useState } from "react";
import TeacherClassShell from "./TeacherClassShell";

/* =========================
TYPES
========================= */

interface Props {
  subjectId: string;
  onBack: () => void;
}

interface SubjectClass {
  id: string;
  name: string;
  students: number;
}

/* =========================
MOCK CLASSES (replace later with API)
========================= */

const mockClasses: SubjectClass[] = [
  {
    id: "1",
    name: "Form 3A",
    students: 38,
  },
  {
    id: "2",
    name: "Form 3B",
    students: 35,
  },
  {
    id: "3",
    name: "Form 3C",
    students: 40,
  },
];

/* =========================
COMPONENT
========================= */

const TeacherSubjectClasses: React.FC<Props> = ({
  subjectId,
  onBack,
}) => {
  const [selectedClass, setSelectedClass] =
    useState<SubjectClass | null>(null);

  /* =========================
  STEP 1: OPEN CLASS SHELL
  ========================= */
  if (selectedClass) {
    return (
      <TeacherClassShell
        subjectId={subjectId}
        classId={selectedClass.id}
        className={selectedClass.name}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  /* =========================
  CLASS LIST VIEW
  ========================= */

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Subject Classes
        </h2>

        <p className="text-sm text-gray-600">
          Classes studying this subject (Subject ID: {subjectId})
        </p>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="text-sm text-maroon-700"
      >
        ← Back to Subject
      </button>

      {/* CLASS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {mockClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-lg shadow p-5 space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-maroon-700">
                {cls.name}
              </h3>

              <p className="text-sm text-gray-600">
                👩‍🎓 {cls.students} Students
              </p>
            </div>

            <button
              onClick={() => setSelectedClass(cls)}
              className="px-4 py-2 text-sm rounded bg-maroon-700 text-white hover:bg-maroon-800"
            >
              View Class
            </button>
          </div>
        ))}

      </div>

    </div>
  );
};

export default TeacherSubjectClasses;