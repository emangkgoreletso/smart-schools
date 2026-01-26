import React, { useState } from "react";
import { tests } from "./MockTests";
import TestCard from "./TestCard";
import TakeTest from "./TakeTest";

const TestsList: React.FC = () => {
  const [activeTestId, setActiveTestId] = useState<string | null>(null);

  const activeTest = tests.find(t => t.id === activeTestId);

  if (activeTest) {
    return <TakeTest test={activeTest} onExit={() => setActiveTestId(null)} />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-maroon-700">
        Online Tests & Quizzes
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {tests.map(test => (
          <TestCard
            key={test.id}
            test={test}
            onStart={setActiveTestId}
          />
        ))}
      </div>
    </div>
  );
};

export default TestsList;
