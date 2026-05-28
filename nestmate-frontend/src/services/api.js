import axios from 'axios';

const API_BASE = 'http://localhost:8080'; //through api-gateway

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

//Auth
export const register = (data) => axios.post(`${API_BASE}/auth/register`, data);
export const login = (data) => axios.post(`${API_BASE}/auth/login`, data);

// Listings
export const createListing = (data) => axios.post(`${API_BASE}/listings`, data, getAuthHeader());
export const getMyListings = (userId) => axios.get(`${API_BASE}/listings/user/${userId}`, getAuthHeader());

// Matching
export const getMatches = (userId) => axios.get(`http://localhost:8080/match/${userId}`, getAuthHeader());

// Profile
export const saveProfile = (data) => axios.post(`${API_BASE}/profile`, data, getAuthHeader());
export const getProfile = (userId) => axios.get(`${API_BASE}/profile/${userId}`, getAuthHeader());

// Payments
export const createPayment = (data) => axios.post(`http://localhost:8085/payments/create-intent`, data, getAuthHeader());