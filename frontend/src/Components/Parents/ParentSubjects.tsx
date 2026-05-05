import React from "react";

interface Subject {
  id: string;
  name: string;
  teacher: string;
}

interface Props {
  subjects: Subject[];
  onSelect: (subject: Subject) => void;
}

const ParentSubjects: React.FC<Props> = ({ subjects, onSelect }) => {

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-maroon-700">
        Subjects
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {subjects.map((s) => (
          <div
            key={s.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(s)}
          >

            <p className="font-medium">{s.name}</p>

            <p className="text-sm text-gray-500">
              Teacher: {s.teacher}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ParentSubjects;