import axios from "axios";

export const userapi = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 5000,
});
