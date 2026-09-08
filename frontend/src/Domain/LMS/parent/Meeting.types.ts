export type MeetingStatus =
  | "Pending"
  | "Accepted"
  | "Declined"
  | "Completed"
  | "Missed";

export type MeetingRequester =
  | "Parent"
  | "Teacher"
  | "Admin";

export interface MeetingRecord {
  id: string;

  studentId: string;

  requester: MeetingRequester;

  teacherName: string;

  parentName: string;

  subject: string;

  description: string;

  meetingDate: string;

  meetingTime: string;

  location: string;

  status: MeetingStatus;

  createdAt: string;
}