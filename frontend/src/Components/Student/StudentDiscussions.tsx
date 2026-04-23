import React, { useMemo, useState } from "react";

/* =========================================
TYPES
========================================= */

interface ClassRef {
  id: string;
  name: string;
}

interface Reply {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  parentReplyId?: string;
}

interface Discussion {
  id: string;
  subjectId: string;
  title: string;
  message: string;
  author: string;
  createdAt: string;
  visibleToClasses: string[];
  replies: Reply[];
  pinned?: boolean;
}

/* =========================================
PROPS
========================================= */

interface Props {
  subjectId: string;
  classes?: ClassRef[];
  currentUser?: {
    name: string;
    role: "student" | "teacher";
  };
}

/* =========================================
COMPONENT
========================================= */

const StudentDiscussions: React.FC<Props> = ({
  subjectId,
  classes = [],
  currentUser = { name: "Student", role: "student" },
}) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      subjectId,
      title: "Limits Revision Help",
      message: "Let’s discuss how to solve limit problems step by step.",
      author: "Teacher",
      createdAt: "2026-04-10",
      visibleToClasses: ["Form 3A", "Form 3B"],
      replies: [
        {
          id: "r1",
          author: "Student",
          message: "Can you explain question 3?",
          createdAt: "2026-04-11",
        },
      ],
      pinned: true,
    },
    {
      id: "2",
      subjectId,
      title: "Homework Question",
      message: "I don’t understand quadratic equations.",
      author: "Student",
      createdAt: "2026-04-11",
      visibleToClasses: ["Form 3A"],
      replies: [],
    },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  /* =========================================
  CREATE DISCUSSION
  ========================================= */

  const createDiscussion = () => {
    if (!title.trim() || !message.trim()) return;

    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      subjectId,
      title,
      message,
      author: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
      visibleToClasses: classes.map((c) => c.name),
      replies: [],
      pinned: false,
    };

    setDiscussions((prev) => [newDiscussion, ...prev]);
    setTitle("");
    setMessage("");
  };

  /* =========================================
  DELETE
  ========================================= */

  const canDelete = (author: string) =>
    currentUser.role === "teacher" || currentUser.name === author;

  const deleteDiscussion = (id: string) => {
    setDiscussions((prev) => prev.filter((d) => d.id !== id));
  };

  const deleteReply = (discussionId: string, replyId: string) => {
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId
          ? { ...d, replies: d.replies.filter((r) => r.id !== replyId) }
          : d
      )
    );
  };

  /* =========================================
  REPLIES
  ========================================= */

  const addReply = (discussionId: string) => {
    const text = replyText[discussionId];
    if (!text?.trim()) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      author: currentUser.name,
      message: text,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId
          ? { ...d, replies: [...d.replies, newReply] }
          : d
      )
    );

    setReplyText((prev) => ({
      ...prev,
      [discussionId]: "",
    }));
  };

  /* =========================================
  FILTER
  ========================================= */

  const filtered = useMemo(() => {
    return discussions.filter((d) =>
      d.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, discussions]);

  /* =========================================
  UI
  ========================================= */

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Subject Discussions
        </h2>
        <p className="text-sm text-gray-600">
          Collaborate and ask questions
        </p>
      </div>

      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Search discussions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="border p-4 rounded space-y-2">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border px-3 py-2 rounded w-full"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={createDiscussion}
          className="bg-maroon-700 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map((d) => (
          <div key={d.id} className="border p-4 rounded space-y-2">
            {d.pinned && (
              <p className="text-xs text-yellow-600">📌 Pinned</p>
            )}

            <h3 className="font-semibold text-maroon-700">{d.title}</h3>

            <p className="text-sm text-gray-600">{d.message}</p>

            <p className="text-xs text-gray-400">
              {d.author} • {d.createdAt}
            </p>

            {canDelete(d.author) && (
              <button
                onClick={() => deleteDiscussion(d.id)}
                className="text-red-500 text-xs"
              >
                Delete
              </button>
            )}

            <div className="border-l pl-3 space-y-2">
              {d.replies.map((r) => (
                <div key={r.id} className="text-sm">
                  <span className="font-medium">{r.author}:</span>{" "}
                  {r.message}

                  {canDelete(r.author) && (
                    <button
                      onClick={() => deleteReply(d.id, r.id)}
                      className="text-red-500 text-xs ml-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  className="border px-2 py-1 rounded w-full text-sm"
                  placeholder="Reply..."
                  value={replyText[d.id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [d.id]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => addReply(d.id)}
                  className="bg-maroon-700 text-white px-3 py-1 text-xs rounded"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDiscussions;