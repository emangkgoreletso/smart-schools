import React, { useState } from "react";

type Folder = "Inbox" | "Sent" | "Drafts";

interface Message {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  body: string;
  date: string;
  read: boolean;
  folder: Folder;
}

interface Props {
  studentId: string;
}

const ParentMessages: React.FC<Props> = ({ studentId }) => {

  const [activeFolder, setActiveFolder] = useState<Folder>("Inbox");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      subject: "Math Assignment Reminder",
      sender: "Math Teacher",
      recipient: "Parent",
      body: "Please ensure Neo completes the algebra assignment before Friday.",
      date: "2026-05-10",
      read: false,
      folder: "Inbox"
    }
  ]);

  const [composeMode, setComposeMode] = useState(false);

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const folders: Folder[] = ["Inbox", "Sent", "Drafts"];

  const filteredMessages = messages.filter(
    (m) => m.folder === activeFolder
  );

  const sendMessage = () => {

    if (!recipient || !subject || !body) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      subject,
      sender: "Parent",
      recipient,
      body,
      date: new Date().toLocaleString(),
      read: true,
      folder: "Sent"
    };

    setMessages([newMessage, ...messages]);

    setRecipient("");
    setSubject("");
    setBody("");
    setComposeMode(false);
  };

  const saveDraft = () => {

    const draft: Message = {
      id: Date.now().toString(),
      subject,
      sender: "Parent",
      recipient,
      body,
      date: new Date().toLocaleString(),
      read: true,
      folder: "Drafts"
    };

    setMessages([draft, ...messages]);

    setComposeMode(false);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    setSelectedMessage(null);
  };

  const openMessage = (message: Message) => {

    setSelectedMessage(message);

    if (!message.read) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, read: true } : m
        )
      );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">

      {/* LEFT PANEL */}
      <div className="space-y-4">

        <button
          onClick={() => setComposeMode(true)}
          className="w-full bg-maroon-700 text-white py-2 rounded"
        >
          Compose
        </button>

        <div className="border rounded">

          {folders.map((folder) => (
            <div
              key={folder}
              onClick={() => {
                setActiveFolder(folder);
                setSelectedMessage(null);
                setComposeMode(false);
              }}
              className={`p-3 cursor-pointer border-b
              ${
                activeFolder === folder
                  ? "bg-maroon-50 font-semibold"
                  : ""
              }`}
            >
              {folder}
            </div>
          ))}

        </div>

      </div>

      {/* MESSAGE LIST */}
      <div className="col-span-1 border rounded p-3 space-y-2">

        {filteredMessages.map((m) => (

          <div
            key={m.id}
            onClick={() => openMessage(m)}
            className={`border p-2 rounded cursor-pointer
            ${!m.read ? "bg-gray-100 font-semibold" : ""}`}
          >

            <p className="text-sm">{m.subject}</p>

            <p className="text-xs text-gray-500">
              {activeFolder === "Inbox" ? m.sender : m.recipient}
            </p>

            <p className="text-xs text-gray-400">{m.date}</p>

          </div>

        ))}

        {filteredMessages.length === 0 && (
          <p className="text-sm text-gray-500">
            No messages
          </p>
        )}

      </div>

      {/* MESSAGE VIEWER / COMPOSER */}
      <div className="col-span-2 border rounded p-4">

        {composeMode && (

          <div className="space-y-3">

            <h3 className="font-semibold text-lg">
              New Message
            </h3>

            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="">Select recipient</option>
              <option>Class Teacher</option>
              <option>Math Teacher</option>
              <option>School Admin</option>
            </select>

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-2 w-full rounded"
            />

            <textarea
              rows={6}
              placeholder="Write message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border p-2 w-full rounded"
            />

            <div className="flex gap-3">

              <button
                onClick={sendMessage}
                className="bg-maroon-700 text-white px-4 py-2 rounded"
              >
                Send
              </button>

              <button
                onClick={saveDraft}
                className="border px-4 py-2 rounded"
              >
                Save Draft
              </button>

            </div>

          </div>

        )}

        {selectedMessage && !composeMode && (

          <div className="space-y-3">

            <h3 className="font-semibold text-lg">
              {selectedMessage.subject}
            </h3>

            <p className="text-sm text-gray-500">
              From: {selectedMessage.sender}
            </p>

            <p className="text-sm text-gray-500">
              To: {selectedMessage.recipient}
            </p>

            <p className="text-xs text-gray-400">
              {selectedMessage.date}
            </p>

            <div className="border p-3 rounded bg-gray-50">
              {selectedMessage.body}
            </div>

            <button
              onClick={() => deleteMessage(selectedMessage.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>

          </div>

        )}

        {!selectedMessage && !composeMode && (
          <p className="text-gray-500">
            Select a message to view
          </p>
        )}

      </div>

    </div>
  );
};

export default ParentMessages;