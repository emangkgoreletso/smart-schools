import React, { useState } from "react";

interface Props {
  studentId: string;
  onClose: () => void;
}

const ParentAbsenceRequest: React.FC<Props> = ({
  studentId,
  onClose
}) => {

  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const submitRequest = () => {
    console.log("Absence request", { studentId, date, reason });
    onClose();
  };

  return (
    <div className="border p-4 rounded bg-gray-50">

      <h3 className="font-semibold text-lg">
        Absence Request
      </h3>

      <input
        type="date"
        className="border p-2 w-full mt-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mt-2"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex gap-3 mt-3">

        <button
          onClick={submitRequest}
          className="bg-maroon-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

        <button
          onClick={onClose}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default ParentAbsenceRequest;