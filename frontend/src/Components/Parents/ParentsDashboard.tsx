import React from "react";

interface Child {
  id: string;
  name: string;
  className: string;
}

interface Props {
  childrenList: Child[];
  onSelectChild: (child: Child) => void;
}

const ParentsDashboard: React.FC<Props> = ({
  childrenList,
  onSelectChild,
}) => {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-maroon-700">
        My Children
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        {childrenList.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-lg shadow p-5 border hover:bg-gray-50"
          >
            <h2 className="font-semibold text-lg">
              {child.name}
            </h2>

            <p className="text-sm text-gray-500">
              Class: {child.className}
            </p>

            <button
              onClick={() => onSelectChild(child)}
              className="mt-3 bg-maroon-700 text-white px-4 py-2 rounded text-sm"
            >
              View Dashboard
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ParentsDashboard;