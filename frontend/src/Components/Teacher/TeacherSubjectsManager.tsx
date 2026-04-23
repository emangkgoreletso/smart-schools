import React, { useState } from "react";
import SubjectShell from "./TeacherSubjectsShell";

interface Subject {
  id: string;
  name: string;
}

interface ClassItem {
  id: string;
  name: string;
}

/* MOCK CLASSES (replace with API later) */
const mockClasses: ClassItem[] = [
  { id: "3A", name: "Form 3A" },
  { id: "3B", name: "Form 3B" },
  { id: "3C", name: "Form 3C" },
];

const subjects: Subject[] = [
  { id: "math", name: "Mathematics" },
  { id: "bio", name: "Biology" },
  { id: "hist", name: "History" },
];

const TeacherSubjectsManager: React.FC = () => {
  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  if (selectedSubject) {
    return (
      <SubjectShell
        subjectId={selectedSubject.id}
        subjectName={selectedSubject.name}
        classes={mockClasses}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        My Subjects
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSubject(s)}
            className="bg-white shadow rounded-lg p-6 text-left hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-maroon-700">
              {s.name}
            </h3>
            <p className="text-sm text-gray-500">
              Open subject workspace
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherSubjectsManager;