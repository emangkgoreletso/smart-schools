import React from "react";

interface MarkItem {
  name: string;
  marks: number;
  total: number;
}

interface Props {
  subjectName: string;
  teacher: string;
  marks: MarkItem[];
  onBack: () => void;
}

const ParentSubjectDetails: React.FC<Props> = ({
  subjectName,
  teacher,
  marks,
  onBack,
}) => {

  return (
    <div className="space-y-4">

      <button
        onClick={onBack}
        className="text-sm text-maroon-700 hover:underline"
      >
        ← Back to Subjects
      </button>

      <h2 className="text-xl font-bold text-maroon-700">
        {subjectName}
      </h2>

      <p className="text-sm text-gray-500">
        Teacher: {teacher}
      </p>

      <table className="w-full text-sm border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Assessment</th>
            <th className="p-2">Marks</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>

        <tbody>

          {marks.map((m, i) => (
            <tr key={i} className="border-t">

              <td className="p-2">{m.name}</td>

              <td className="p-2 text-center">{m.marks}</td>

              <td className="p-2 text-center">{m.total}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ParentSubjectDetails;