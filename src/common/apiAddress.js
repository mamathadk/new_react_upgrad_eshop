import axios from "axios";
import { toast } from "react-toastify";
// Base URL for the API
const API_BASE_URL = "https://dev-project-ecommerce.upgrad.dev/api";

const TOKEN =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1veXlAZGVtby5jb20iLCJpYXQiOjE3MzUzMTAzNzUsImV4cCI6MTczNTMxODc3NX0.CZeTov2XPK2ipmb2XPw2XO26l94teqX3d73UZzyvNOIrTChE7Pm0bZWAc2StZxBVBTSkZyhY0V3Ec8DlD8VTCA";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-auth-token": TOKEN,
    "Content-Type": "application/json",
  },
});

export const fetchAddresses = async () => {
  try {
    const response = await axiosInstance.get("/addresses");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching addresses: " + error.message);
  }
};

export const addAddress = async (address) => {
  try {
    const response = await axiosInstance.post("/addresses", address);
    return response.data;
  } catch (error) {
    throw new Error("Error adding address: " + error.message);
  }
};

export const placeOrderApi = async (orderData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/orders`,
      {
        quantity: orderData.quantity,
        product: orderData.productId,
        address: orderData.addressId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": TOKEN,
        },
      }
    );

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Failed to place the order. Please try again.";
    throw new Error(errorMessage);
  }
};
