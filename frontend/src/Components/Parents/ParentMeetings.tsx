import React, { useState } from "react";
import { MeetingRecord } from "../../Domain/LMS/parent/Meeting.types";

interface Props {
  studentId: string;
}

const ParentMeetings: React.FC<Props> = ({ studentId }) => {

  const [meetings, setMeetings] = useState<MeetingRecord[]>([
    {
      id: "1",
      studentId,
      requester: "Teacher",
      teacherName: "Mrs Motsumi",
      parentName: "Parent",
      subject: "Mathematics Performance",
      description: "Discuss student's performance in algebra",
      meetingDate: "2026-06-01",
      meetingTime: "10:00",
      location: "School Office",
      status: "Pending",
      createdAt: "2026-05-10"
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  const requestMeeting = () => {

    const newMeeting: MeetingRecord = {

      id: Date.now().toString(),

      studentId,

      requester: "Parent",

      teacherName,

      parentName: "Parent",

      subject,

      description,

      meetingDate,

      meetingTime,

      location: "School",

      status: "Pending",

      createdAt: new Date().toISOString()
    };

    setMeetings([newMeeting, ...meetings]);

    setShowForm(false);

    setTeacherName("");
    setSubject("");
    setDescription("");
    setMeetingDate("");
    setMeetingTime("");
  };

  const acceptMeeting = (id: string) => {

    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "Accepted" } : m
      )
    );
  };

  const declineMeeting = (id: string) => {

    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "Declined" } : m
      )
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-bold text-maroon-700">
          Meetings
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-maroon-700 text-white px-4 py-2 rounded"
        >
          Request Meeting
        </button>

      </div>

      {/* Request form */}

      {showForm && (

        <div className="border p-4 rounded space-y-3">

          <h3 className="font-semibold">Request Meeting</h3>

          <select
            className="border p-2 w-full rounded"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          >
            <option value="">Select Teacher</option>
            <option>Math Teacher</option>
            <option>Science Teacher</option>
            <option>Class Teacher</option>
          </select>

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <textarea
            placeholder="Meeting purpose"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button
            onClick={requestMeeting}
            className="bg-maroon-700 text-white px-4 py-2 rounded"
          >
            Submit Request
          </button>

        </div>
      )}

      {/* Meeting history */}

      <div className="space-y-3">

        {meetings.map((meeting) => (

          <div
            key={meeting.id}
            className="border p-4 rounded space-y-2"
          >

            <div className="flex justify-between">

              <p className="font-semibold">
                {meeting.subject}
              </p>

              <span
                className={`text-sm px-2 py-1 rounded
                ${
                  meeting.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : meeting.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : meeting.status === "Declined"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100"
                }`}
              >
                {meeting.status}
              </span>

            </div>

            <p className="text-sm">
              Teacher: {meeting.teacherName}
            </p>

            <p className="text-sm text-gray-600">
              {meeting.description}
            </p>

            <p className="text-sm text-gray-500">
              {meeting.meetingDate} at {meeting.meetingTime}
            </p>

            <p className="text-xs text-gray-400">
              Requested by {meeting.requester}
            </p>

            {meeting.status === "Pending" &&
              meeting.requester !== "Parent" && (

                <div className="flex gap-3">

                  <button
                    onClick={() => acceptMeeting(meeting.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => declineMeeting(meeting.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Decline
                  </button>

                </div>
              )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default ParentMeetings;