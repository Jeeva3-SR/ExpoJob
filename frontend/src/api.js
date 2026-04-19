import axios from 'axios';

const API = axios.create({
  baseURL: 'https://expojob.onrender.com',
});

// ─── Expense APIs ───────────────────────────────────────
export const getExpenses = (params) => API.get('/api/expenses', { params });
export const createExpense = (data) => API.post('/api/expenses', data);
export const updateExpense = (id, data) => API.put(`/api/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/api/expenses/${id}`);

// ─── Job APIs ───────────────────────────────────────────
export const getJobs = (params) => API.get('/api/jobs', { params });
export const createJob = (data) => API.post('/api/jobs', data);
export const updateJob = (id, data) => API.put(`/api/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/api/jobs/${id}`);
