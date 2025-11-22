// src/api/loans.api.js
import axios from "axios";

// Si ya usas una URL base en tasks.api.js, copia la misma:
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const getLoansRequest = () => axios.get(`${API}/loans`);

export const getLoanRequest = (id) => axios.get(`${API}/loans/${id}`);

export const createLoanRequest = (loanData) =>
  axios.post(`${API}/loans`, loanData);

export const updateLoanRequest = (id, loanData) =>
  axios.put(`${API}/loans/${id}`, loanData);

export const deleteLoanRequest = (id) =>
  axios.delete(`${API}/loans/${id}`);
