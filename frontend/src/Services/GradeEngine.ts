import { Assessment } from "../Types/Assessment";
import { Grade } from "../Types/Grade";
import { Student } from "../Types/Student";
import { StudentResult } from "../Types/StudentResults";

/* =====================================================
   GET GRADES FOR A STUDENT
===================================================== */

export const getStudentGrades = (
  studentId: string,
  grades: Grade[]
): Grade[] => {
  return grades.filter((g) => g.studentId === studentId);
};

/* =====================================================
   GET GRADE FOR SPECIFIC ASSESSMENT
===================================================== */

export const getAssessmentScore = (
  studentId: string,
  assessmentId: string,
  grades: Grade[]
): number | null => {
  const grade = grades.find(
    (g) =>
      g.studentId === studentId &&
      g.assessmentId === assessmentId
  );

  return grade ? grade.score : null;
};

/* =====================================================
   CALCULATE STUDENT AVERAGE
===================================================== */

export const calculateStudentAverage = (
  studentId: string,
  assessments: Assessment[],
  grades: Grade[]
): number => {
  const studentGrades = grades.filter(
    (g) => g.studentId === studentId
  );

  if (!studentGrades.length) return 0;

  let totalScore = 0;
  let totalMax = 0;

  studentGrades.forEach((grade) => {
    const assessment = assessments.find(
      (a) => a.id === grade.assessmentId
    );

    if (!assessment) return;

    totalScore += grade.score;
    totalMax += assessment.maxScore;
  });

  if (totalMax === 0) return 0;

  return Math.round((totalScore / totalMax) * 100);
};

/* =====================================================
   CALCULATE CLASS AVERAGE
===================================================== */

export const calculateClassAverage = (
  students: Student[],
  assessments: Assessment[],
  grades: Grade[]
): number => {
  if (!students.length) return 0;

  const averages = students.map((student) =>
    calculateStudentAverage(student.id, assessments, grades)
  );

  const total = averages.reduce((a, b) => a + b, 0);

  return Math.round(total / averages.length);
};

/* =====================================================
   CALCULATE STUDENT RANKINGS
===================================================== */

export const calculateRankings = (
  students: Student[],
  assessments: Assessment[],
  grades: Grade[]
): StudentResult[] => {
  const results = students.map((student) => ({
    studentId: student.id,
    average: calculateStudentAverage(
      student.id,
      assessments,
      grades
    ),
    rank: 0,
  }));

  results.sort((a, b) => b.average - a.average);

  results.forEach((r, index) => {
    r.rank = index + 1;
  });

  return results;
};

/* =====================================================
   GET TOP STUDENT
===================================================== */

export const getTopStudent = (
  students: Student[],
  assessments: Assessment[],
  grades: Grade[]
): StudentResult | null => {
  const rankings = calculateRankings(
    students,
    assessments,
    grades
  );

  return rankings.length ? rankings[0] : null;
};

/* =====================================================
   CATEGORY AVERAGE
===================================================== */

export const calculateCategoryAverage = (
  studentId: string,
  category: string,
  assessments: Assessment[],
  grades: Grade[]
): number => {
  const filteredAssessments = assessments.filter(
    (a) => a.category === category
  );

  const relevantGrades = grades.filter((g) =>
    filteredAssessments.some(
      (a) => a.id === g.assessmentId
    )
  );

  if (!relevantGrades.length) return 0;

  let totalScore = 0;
  let totalMax = 0;

  relevantGrades.forEach((grade) => {
    const assessment = assessments.find(
      (a) => a.id === grade.assessmentId
    );

    if (!assessment) return;

    totalScore += grade.score;
    totalMax += assessment.maxScore;
  });

  if (!totalMax) return 0;

  return Math.round((totalScore / totalMax) * 100);
};

/* =====================================================
   GRADE LETTER CONVERSION
===================================================== */

export const getLetterGrade = (
  score: number
): string => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

/* =====================================================
   PERFORMANCE LABEL
===================================================== */

export const getPerformanceLabel = (
  score: number
): string => {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Satisfactory";
  if (score >= 50) return "Needs Improvement";
  return "At Risk";
};