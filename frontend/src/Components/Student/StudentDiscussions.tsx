import React from "react";
import DiscussionThread from "./DiscussionThread";

const StudentDiscussions: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-maroon-700">
        Subject Discussion Forums
      </h2>

      <p className="text-gray-600">
        Ask questions, participate in discussions, and get feedback from your teachers.
      </p>

      <div className="space-y-6">
        <DiscussionThread subject="Mathematics" />
        <DiscussionThread subject="Biology" />
        <DiscussionThread subject="History" />
      </div>
    </div>
  );
};

export default StudentDiscussions;
