import axios from "../utils/axios";
import { API } from "../constants/urls";

export const getPackagesApi = (params) =>
  axios.get(API.SEARCH, {
    params,
  });
