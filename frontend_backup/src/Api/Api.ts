import axios from "axios";

const API_BASE = "https://localhost:5025/api"; // adjust to match your backend port

// ✅ Configure axios defaults
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =============== 🔐 AUTH ====================
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// =============== 🎓 STUDENTS ====================
export const getStudents = async () => {
  const res = await api.get("/students");
  return res.data;
};

// =============== 🧑‍🏫 TEACHERS ====================
export const getTeachers = async () => {
  const res = await api.get("/teachers");
  return res.data;
};

// =============== 🧾 ASSIGNMENTS ====================
export const getAssignments = async () => {
  const res = await api.get("/assignments");
  return res.data;
};

export const createAssignment = async (assignment: any) => {
  const res = await api.post("/assignments", assignment);
  return res.data;
};

export const updateAssignment = async (id: number, assignment: any) => {
  const res = await api.put(`/assignments/${id}`, assignment);
  return res.data;
};

export const deleteAssignment = async (id: number) => {
  const res = await api.delete(`/assignments/${id}`);
  return res.data;
};

// =============== 🧑‍🎓 SUBMISSIONS ====================
export const getSubmissions = async () => {
  const res = await api.get("/submissions");
  return res.data;
};

export const createSubmission = async (submission: any) => {
  const res = await api.post("/submissions", submission);
  return res.data;
};

export const updateSubmission = async (id: number, submission: any) => {
  const res = await api.put(`/submissions/${id}`, submission);
  return res.data;
};

export const deleteSubmission = async (id: number) => {
  const res = await api.delete(`/submissions/${id}`);
  return res.data;
};

// =============== 💰 PAYMENTS ====================
export const recordPayment = async (payment: any) => {
  const res = await api.post("/payments", payment);
  return res.data;
};

export const getPaymentsByStudent = async (studentId: number) => {
  const res = await api.get(`/payments/student/${studentId}`);
  return res.data;
};

export const getStudentBalance = async (studentId: number) => {
  const res = await api.get(`/payments/balance/${studentId}`);
  return res.data;
};

// =============== 🧠 TESTS ====================
export const getTests = async () => {
  const res = await api.get("/tests");
  return res.data;
};

export const createTest = async (test: any) => {
  const res = await api.post("/tests", test);
  return res.data;
};

export const submitTestResult = async (result: any) => {
  const res = await api.post("/testresults", result);
  return res.data;
};

export const getTestResults = async (studentId: number) => {
  const res = await api.get(`/testresults/student/${studentId}`);
  return res.data;
};

// =============== 🧾 ADMISSIONS ====================
export const createAdmission = async (data: any) => {
  const res = await api.post("/admissions", data);
  return res.data;
};

export const getAdmissions = async () => {
  const res = await api.get("/admissions");
  return res.data;
};

// =============== 📊 REPORTS ====================
export const getReports = async () => {
  const res = await api.get("/reports");
  return res.data;
};

// ✅ Export axios instance for direct use if needed
export default api;
