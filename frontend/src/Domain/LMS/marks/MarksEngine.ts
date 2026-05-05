import { Assessment } from "./Assessment.types";
import { StudentMark } from "./Marks.types";
import { calculateGrade } from "../shared/GradeUtils";
import { calculateClassRanking } from "./RankingEngine";

/* ===============================
SUBJECT RESULT TYPE
=============================== */

interface SubjectAverageResult {
  subjectId: string;
  average: number;
  grade: string;
}

/* ===============================
CALCULATE SUBJECT AVERAGE
=============================== */

export const calculateSubjectAverage = (
  studentId: string,
  subjectId: string,
  assessments: Assessment[],
  marks: StudentMark[]
): SubjectAverageResult => {

  const subjectAssessments = assessments.filter(
    (a) => a.subjectId === subjectId
  );

  let weightedTotal = 0;
  let weightSum = 0;

  subjectAssessments.forEach((assessment) => {

    const mark = marks.find(
      (m) =>
        m.studentId === studentId &&
        m.assessmentId === assessment.id
    );

    if (!mark) return;

    const percent =
      (mark.marksObtained / assessment.totalMarks) * 100;

    weightedTotal += percent * assessment.weight;

    weightSum += assessment.weight;
  });

  const average =
    weightSum === 0 ? 0 : weightedTotal / weightSum;

  return {
    subjectId,
    average,
    grade: calculateGrade(average),
  };
};

/* ===============================
OVERALL TERM AVERAGE
=============================== */

export const calculateOverallAverage = (
  subjectResults: { average: number }[]
): number => {

  if (subjectResults.length === 0) return 0;

  const total = subjectResults.reduce(
    (sum, s) => sum + s.average,
    0
  );

  return total / subjectResults.length;
};

/* ===============================
GENERATE TERM RESULTS
=============================== */

export const generateTermResults = (
  classId: string,
  studentIds: string[],
  subjectIds: string[],
  assessments: Assessment[],
  marks: StudentMark[]
) => {

  const results = studentIds.map((studentId) => {

    const subjectResults = subjectIds.map((subjectId) =>
      calculateSubjectAverage(
        studentId,
        subjectId,
        assessments,
        marks
      )
    );

    const overallAverage =
      calculateOverallAverage(subjectResults);

    return {
      studentId,
      classId,
      subjectResults,
      overallAverage,
    };
  });

  const rankings = calculateClassRanking(
    results.map((r) => ({
      studentId: r.studentId,
      average: r.overallAverage,
    }))
  );

  return results.map((result) => {

    const rank = rankings.find(
      (r) => r.studentId === result.studentId
    );

    return {
      ...result,
      position: rank?.position ?? 0,
    };
  });
};