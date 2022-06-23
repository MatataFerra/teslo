import axios from "axios";

export const getProducts = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,
});
