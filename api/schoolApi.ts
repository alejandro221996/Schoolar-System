import axios from "axios";

const schoolApi = axios.create({
  baseURL: "/api",
});

export default schoolApi;
