import React, { useState } from "react";

interface Props {
  childId: string;
}

const ParentMessages: React.FC<Props> = ({ childId }) => {

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message) return;

    alert("Message sent to teacher");
    setMessage("");
  };

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold text-maroon-700">
        Message Teacher
      </h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className="border rounded w-full p-3"
      />

      <button
        onClick={sendMessage}
        className="bg-maroon-700 text-white px-4 py-2 rounded"
      >
        Send Message
      </button>

    </div>
  );
};

export default ParentMessages;