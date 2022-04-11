import axios from "axios";

export const getProducts = axios.create({
  baseURL: "http://localhost:3000/api/products",
});
