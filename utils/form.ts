import Cookies from "js-cookie";
import { FormData } from "../interfaces";

export const getAddressFromCookies = (): FormData => {
  const cookies: FormData = {
    firstName: Cookies.get("firstName") ?? "",
    lastName: Cookies.get("lastName") ?? "",
    address: Cookies.get("address") ?? "",
    address2: Cookies.get("address2") ?? "",
    zip: Cookies.get("zip") ?? "",
    city: Cookies.get("city") ?? "",
    country: Cookies.get("country") ?? "",
    phone: Cookies.get("phone") ?? "",
  };

  return cookies;
};
