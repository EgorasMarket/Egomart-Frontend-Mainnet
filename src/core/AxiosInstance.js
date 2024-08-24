import axios from "axios";

export const baseURL = "https://sandboxbcd.egodeo.org";

export const api = axios.create({
  baseURL,
});
