import React, { useState } from "react";

interface Props {
  childId: string;
}

const ParentMeetings: React.FC<Props> = ({ childId }) => {

  const [date, setDate] = useState("");

  const requestMeeting = () => {
    if (!date) return;

    alert("Meeting request sent");
    setDate("");
  };

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold text-maroon-700">
        Request Teacher Meeting
      </h3>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      <button
        onClick={requestMeeting}
        className="bg-maroon-700 text-white px-4 py-2 rounded"
      >
        Request Meeting
      </button>

    </div>
  );
};

export default ParentMeetings;