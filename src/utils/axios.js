import axios from "axios";
import { BASE_URL } from "../constants/config";

export default axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
