import axios from "axios";

const pickupApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org/search",
  params: {
    format: "json",
    country: "argentina",
  },
});

export default pickupApi;
