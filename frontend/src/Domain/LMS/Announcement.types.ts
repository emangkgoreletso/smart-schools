export interface Announcement {
  id: string;
  subjectId: string;

  title: string;
  message: string;

  date: string;

  classId?: string;
}