import axios from "axios";

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

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { category },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

//product details
export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// add product

export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products", productData);
    return response.data;
    // const response = await axios.post(`${API_BASE_URL}/products`, productData);
    // return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

//deleting a product

export const deleteProductById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);

    // Return success response if the product was deleted
    if (response.status === 204) {
      return { success: true };
    } else {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
};

// Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosInstance.put(
      `/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};
