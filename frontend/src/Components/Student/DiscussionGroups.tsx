import React, { useState } from "react";

interface DiscussionMessage {
  id: string;
  author: string;
  message: string;
  date: string;
}

interface DiscussionGroup {
  id: string;
  subject: string;
  messages: DiscussionMessage[];
}

const DiscussionGroups: React.FC = () => {
  const [groups] = useState<DiscussionGroup[]>([
    {
      id: "1",
      subject: "Mathematics",
      messages: [
        {
          id: "m1",
          author: "Student A",
          message: "Can someone explain quadratic equations?",
          date: "2026-01-11",
        },
        {
          id: "m2",
          author: "Mr. Molefe (Teacher)",
          message: "Yes, I’ll post a worked example shortly.",
          date: "2026-01-11",
        },
      ],
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Discussion Groups
      </h2>

      {groups.map((group) => (
        <div key={group.id} className="mb-6">
          <h3 className="font-medium text-maroon-700 mb-2">
            {group.subject}
          </h3>

          <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
            {group.messages.map((msg) => (
              <div key={msg.id}>
                <p className="text-sm">
                  <span className="font-medium">{msg.author}</span>:{" "}
                  {msg.message}
                </p>
                <p className="text-xs text-gray-500">{msg.date}</p>
              </div>
            ))}
          </div>

          {/* Post message */}
          <div className="flex gap-2 mt-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              className="px-4 py-2 bg-maroon-700 text-white rounded-full text-sm"
              onClick={() => setNewMessage("")}
            >
              Send
            </button>
          </div>
        </div>
      ))}

      {groups.length === 0 && (
        <p className="text-gray-500 text-sm">
          No discussion groups available.
        </p>
      )}
    </div>
  );
};

export default DiscussionGroups;
