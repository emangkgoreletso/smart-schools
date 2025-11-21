import axios from "axios";
import { Test } from "../Types/Test";

const API_URL = "http://localhost:5025/api/tests";

export const getTests = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getTestById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createTest = async (test: Test) => {
  const res = await axios.post(API_URL, test);
  return res.data;
};

export const updateTest = async (id: number, test: Test) => {
  const res = await axios.put(`${API_URL}/${id}`, test);
  return res.data;
};

export const deleteTest = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
