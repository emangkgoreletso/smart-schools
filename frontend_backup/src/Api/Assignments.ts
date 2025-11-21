import api from "./Api";
import { Assignment } from "../Types/Assignment";

export const getAssignments = () => api.get("/assignments");
export const getAssignmentById = (id: number) => api.get(`/assignments/${id}`);
export const createAssignment = (data: Assignment) => api.post("/assignments", data);
export const updateAssignment = (id: number, data: Assignment) => api.put(`/assignments/${id}`, data);
export const deleteAssignment = (id: number) => api.delete(`/assignments/${id}`);
