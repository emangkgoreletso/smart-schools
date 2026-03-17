import React, { useState } from "react";

const NewPostForm: React.FC<{ onSubmit: (content: string) => void }> = ({
  onSubmit,
}) => {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a question or share your thoughts..."
        className="flex-1 p-2 border rounded-full"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-maroon-700 text-white font-semibold"
      >
        Post
      </button>
    </form>
  );
};

export default NewPostForm;
