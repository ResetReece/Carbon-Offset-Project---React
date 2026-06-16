import { API_URL } from './constants';
import { fetchWithTimeout } from './api';

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

/**
 * Get auth token from localStorage
 * @returns {string|null} - Auth token or null
 */
export function getAuthToken() {
  return localStorage.getItem('authToken');
}

/**
 * Get user email from localStorage
 * @returns {string|null} - User email or null
 */
export function getUserEmail() {
  return localStorage.getItem('userEmail');
}

/**
 * Save authentication data
 * @param {string} token - JWT token
 * @param {string} email - User email
 */
export function saveAuthData(token, email) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userEmail', email);
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  window.location.href = '/auth';
}

/**
 * Signup user
 * @param {string} name - Full name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {Promise<object>} - Response data
 */
export async function signup(name, email, password) {
  const response = await fetchWithTimeout(API_URL + '/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  
  const data = await response.json();
  
  if (data.token) {
    saveAuthData(data.token, email);
  }
  
  return data;
}

/**
 * Login user
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {Promise<object>} - Response data
 */
export async function login(email, password) {
  const response = await fetchWithTimeout(API_URL + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.token) {
    saveAuthData(data.token, email);
  }
  
  return data;
}

/**
 * Load user profile data
 * @returns {Promise<object>} - User profile data
 */
export async function loadUserProfile() {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token');
  }
  
  const response = await fetchWithTimeout(API_URL + '/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
}

/**
 * Update user profile
 * @param {object} updates - Profile updates
 * @returns {Promise<object>} - Updated profile data
 */
export async function updateUserProfile(updates) {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token');
  }
  
  const response = await fetchWithTimeout(API_URL + '/user', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return await response.json();
}

/**
 * Change password
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<object>} - Response data
 */
export async function changePassword(oldPassword, newPassword) {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token');
  }
  
  const response = await fetchWithTimeout(API_URL + '/change-password', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ oldPassword, newPassword })
  });
  
  return await response.json();
}

/**
 * Get user orders
 * @returns {Promise<array>} - Orders array
 */
export async function getUserOrders() {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token');
  }
  
  const response = await fetchWithTimeout(API_URL + '/orders', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return await response.json();
}
