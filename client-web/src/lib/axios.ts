import axios from "axios";

const api = (host: string, port: string) => {
  return axios.create({
    baseURL: `http://${host}:${port}`,
  });
};

export default api;
