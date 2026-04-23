import React from "react";

interface Props {
  childId: string;
}

const ParentPerformance: React.FC<Props> = ({ childId }) => {

  const subjects = [
    { name: "Mathematics", average: 74 },
    { name: "Biology", average: 69 },
    { name: "English", average: 81 },
    { name: "Chemistry", average: 66 },
  ];

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold text-maroon-700">
        Academic Performance
      </h3>

      <div className="space-y-3">

        {subjects.map((s) => (
          <div
            key={s.name}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <p className="font-medium">{s.name}</p>

            <span className="text-maroon-700 font-semibold">
              {s.average}%
            </span>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ParentPerformance;