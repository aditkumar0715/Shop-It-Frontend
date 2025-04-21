import { api } from "./api";

export const getProducts = (params) => api.get("/products", { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const searchProducts = (q, params) =>
  api.get("/products/search", { params: { q, ...params } });
export const getCategories = () => api.get("/products/categories");
export const getByCategory = (category) =>
  api.get(`/products/category/${category}`);
export const getAllCategories = () => api.get("/products/categories");
export const getProductsByCategory = (category, params) =>
  api.get(`/products/category/${category}`, { params });
