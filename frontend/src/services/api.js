
import axios from "axios";

const api = axios.create({
  baseURL: "https://property-tax-collection-and-tracking.onrender.com",
});

export default api;
