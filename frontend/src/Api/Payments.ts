import axios from "axios";
import { Admission } from "../Types/Admission";

const API_URL = "http://localhost:5025/api/admissions";

export const getAdmissions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getAdmissionById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createAdmission = async (data: Admission) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateAdmission = async (id: number, data: Admission) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteAdmission = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
