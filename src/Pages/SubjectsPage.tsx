// src/Pages/SubjectsPage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: string;
  name: string;
  teacher: string;
  progress: number;
}

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();

  // In production → fetch from API
  const subjects: Subject[] = [
    {
      id: "math101",
      name: "Mathematics",
      teacher: "Mr. Dube",
      progress: 78,
    },
    {
      id: "eng101",
      name: "English",
      teacher: "Ms. Molefe",
      progress: 85,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-maroon-700">
        📚 My Subjects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-lg shadow p-5 space-y-3 cursor-pointer hover:shadow-md transition"
            onClick={() =>
              navigate(
                `/student-centre/subjects/${subject.id}`
              )
            }
          >
            <div>
              <h3 className="text-lg font-bold">
                {subject.name}
              </h3>
              <p className="text-sm text-gray-500">
                Teacher: {subject.teacher}
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-maroon-700 h-2 rounded-full"
                  style={{
                    width: `${subject.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;
