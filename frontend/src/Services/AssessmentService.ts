import { api } from "./Api";

export const AssessmentService = {
  getAll: () => api.get("/assessments"),

  getAssignments: () => api.get("/assessments/assignments"),

  getTests: () => api.get("/assessments/tests"),

  getQuizzes: () => api.get("/assessments/quizzes"),

  getExams: () => api.get("/assessments/exams"),

  create: (data: any) => api.post("/assessments", data),
};