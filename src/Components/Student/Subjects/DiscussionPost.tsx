import React from "react";

const DiscussionPost: React.FC<{
  post: {
    author: string;
    role: "student" | "teacher";
    content: string;
  };
}> = ({ post }) => {
  return (
    <div
      className={`p-3 rounded-lg border-l-4 ${
        post.role === "teacher"
          ? "border-maroon-700 bg-maroon-50"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <p className="text-sm font-medium">
        {post.author}{" "}
        {post.role === "teacher" && (
          <span className="text-xs text-maroon-700">(Teacher)</span>
        )}
      </p>
      <p className="text-sm text-gray-700">{post.content}</p>
    </div>
  );
};

export default DiscussionPost;
