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
  title: string;
  message: string;
  author: string;
  createdAt: string;

  visibleToClasses: string[];

  replies: Reply[];
}

/* =========================================
PROPS
========================================= */

interface Props {
  subjectId: string;
  classes: ClassRef[];
}

/* =========================================
MOCK DATA
========================================= */

const initialDiscussions: Discussion[] = [
  {
    id: "d1",
    title: "Welcome to Algebra",
    message: "Feel free to ask questions about today's lesson.",
    author: "Teacher",
    createdAt: "2026-04-10",
    visibleToClasses: ["Form 3A", "Form 3B"],
    replies: [
      {
        id: "r1",
        author: "Neo Dlamini",
        message: "Will we cover quadratic equations soon?",
        createdAt: "2026-04-10",
      },
    ],
  },
];

/* =========================================
COMPONENT
========================================= */

const TeacherDiscussions: React.FC<Props> = ({
  subjectId,
  classes,
}) => {
  const [discussions, setDiscussions] =
    useState<Discussion[]>(initialDiscussions);

  const [search, setSearch] = useState("");

  /* =========================================
  CREATE DISCUSSION
  ========================================= */

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
  };

  const createDiscussion = () => {
    if (!title || !message) return;

    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      title,
      message,
      author: "Teacher",
      createdAt: new Date().toISOString().split("T")[0],
      visibleToClasses: selectedClasses.length
        ? selectedClasses
        : classes.map((c) => c.name),
      replies: [],
    };

    setDiscussions((prev) => [newDiscussion, ...prev]);

    setTitle("");
    setMessage("");
    setSelectedClasses([]);
  };

  /* =========================================
  DELETE DISCUSSION
  ========================================= */

  const deleteDiscussion = (id: string) => {
    setDiscussions((prev) => prev.filter((d) => d.id !== id));
  };

  /* =========================================
  REPLIES
  ========================================= */

  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const addReply = (discussionId: string, parentReplyId?: string) => {
    const text = replyText[parentReplyId || discussionId];
    if (!text) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      author: "Teacher",
      message: text,
      createdAt: new Date().toISOString().split("T")[0],
      parentReplyId,
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
      [parentReplyId || discussionId]: "",
    }));
  };

  /* =========================================
  DELETE REPLY
  ========================================= */

  const deleteReply = (discussionId: string, replyId: string) => {
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              replies: d.replies.filter((r) => r.id !== replyId),
            }
          : d
      )
    );
  };

  /* =========================================
  FILTERED DISCUSSIONS
  ========================================= */

  const filtered = useMemo(() => {
    return discussions.filter((d) =>
      d.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, discussions]);

  /* =========================================
  MENTION HIGHLIGHT
  ========================================= */

  const highlightMentions = (text: string) => {
    const parts = text.split(/(@\w+)/g);

    return parts.map((p, i) =>
      p.startsWith("@") ? (
        <span key={i} className="text-blue-600 font-medium">
          {p}
        </span>
      ) : (
        p
      )
    );
  };

  /* =========================================
  REPLY TREE
  ========================================= */

  const renderReplies = (
    discussionId: string,
    replies: Reply[],
    parentId?: string,
    depth = 0
  ) => {
    return replies
      .filter((r) => r.parentReplyId === parentId)
      .map((r) => (
        <div
          key={r.id}
          className="text-sm space-y-2"
          style={{ marginLeft: depth * 20 }}
        >
          <div>
            <span className="font-medium">{r.author}:</span>{" "}
            {highlightMentions(r.message)}

            <span className="text-xs text-gray-400 ml-2">
              ({r.createdAt})
            </span>

            <button
              onClick={() => deleteReply(discussionId, r.id)}
              className="text-red-500 text-xs ml-2"
            >
              Delete
            </button>
          </div>

          {/* reply input */}
          <div className="flex gap-2">
            <input
              placeholder="Reply..."
              value={replyText[r.id] || ""}
              onChange={(e) =>
                setReplyText((prev) => ({
                  ...prev,
                  [r.id]: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded w-full"
            />

            <button
              onClick={() => addReply(discussionId, r.id)}
              className="bg-maroon-700 text-white px-2 py-1 rounded text-xs"
            >
              Reply
            </button>
          </div>

          {renderReplies(discussionId, replies, r.id, depth + 1)}
        </div>
      ));
  };

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
          Engage students across all enrolled classes
        </p>
      </div>

      {/* SEARCH */}

      <input
        placeholder="Search discussions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      {/* CREATE DISCUSSION */}

      <div className="border rounded-lg p-4 space-y-3">

        <h3 className="font-semibold text-maroon-700">
          Create Discussion
        </h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        {/* CLASS TARGETING */}

        <div>
          <p className="text-sm font-medium mb-2">
            Visible to classes:
          </p>

          <div className="flex flex-wrap gap-2">
            {classes.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleClass(c.name)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedClasses.includes(c.name)
                    ? "bg-maroon-700 text-white"
                    : "border-maroon-700 text-maroon-700"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={createDiscussion}
          className="bg-maroon-700 text-white px-4 py-2 rounded"
        >
          Post Discussion
        </button>
      </div>

      {/* DISCUSSIONS */}

      <div className="space-y-4">

        {filtered.map((d) => (
          <div key={d.id} className="border rounded-lg p-4 space-y-3">

            <div>

              <h3 className="font-semibold text-maroon-700">
                {d.title}
              </h3>

              <p className="text-sm text-gray-600">
                {highlightMentions(d.message)}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Posted by {d.author} | {d.createdAt}
              </p>

              <p className="text-xs text-gray-400">
                Visible: {d.visibleToClasses.join(", ")}
              </p>

              <button
                onClick={() => deleteDiscussion(d.id)}
                className="text-red-500 text-xs mt-1"
              >
                Delete Discussion
              </button>

            </div>

            <div className="space-y-2 ml-4 border-l pl-4">

              {renderReplies(d.id, d.replies)}

              <div className="flex gap-2">

                <input
                  placeholder="Reply..."
                  value={replyText[d.id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [d.id]: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded w-full"
                />

                <button
                  onClick={() => addReply(d.id)}
                  className="bg-maroon-700 text-white px-3 py-1 rounded"
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

export default TeacherDiscussions;