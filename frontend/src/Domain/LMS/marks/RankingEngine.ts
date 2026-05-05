export interface StudentAverage {
  studentId: string;
  average: number;
}

export const calculateClassRanking = (
  students: StudentAverage[]
) => {

  const sorted = [...students].sort(
    (a, b) => b.average - a.average
  );

  return sorted.map((student, index) => ({
    studentId: student.studentId,
    position: index + 1,
  }));
};