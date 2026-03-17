import React, { useState } from "react";
import DiscussionPost from "./DiscussionPost";
import NewPostForm from "../NewPostForm";

type Post = {
  id: string;
  author: string;
  role: "student" | "teacher";
  content: string;
};

const DiscussionThread: React.FC<{ subject: string }> = ({ subject }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Ms. Dube",
      role: "teacher",
      content: "Please review Chapter 4 before Friday’s quiz.",
    },
    {
      id: "2",
      author: "John Molefe",
      role: "student",
      content: "Can someone explain question 3 from the worksheet?",
    },
  ]);

  const addPost = (content: string) => {
    setPosts([
      ...posts,
      {
        id: Date.now().toString(),
        author: "You",
        role: "student",
        content,
      },
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-maroon-700">
        {subject} Forum
      </h3>

      <div className="space-y-3">
        {posts.map((post) => (
          <DiscussionPost key={post.id} post={post} />
        ))}
      </div>

      <NewPostForm onSubmit={addPost} />
    </div>
  );
};

export default DiscussionThread;
