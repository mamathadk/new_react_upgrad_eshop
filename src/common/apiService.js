import axios from "axios";

// Base URL for the API
const API_BASE_URL = "https://dev-project-ecommerce.upgrad.dev/api";
const TOKEN =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1veXlAZGVtby5jb20iLCJpYXQiOjE3MzUyOTI2MTgsImV4cCI6MTczNTMwMTAxOH0.2epOs8mY32HHKdemItbuEvCGvdW_qDVp_E6eaeaMzz84lY6NyTzeKkP6k7RF2zgS6LTC21dGrnldk-qCBl-HTA";
// Function to handle signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Function to handle signin (if needed)
export const signin = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
