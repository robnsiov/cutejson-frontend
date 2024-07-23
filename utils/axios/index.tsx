import axios from "axios";

const Axios = axios.create({
  baseURL: "http://127.0.0.1:8086",
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const cuteJsonToken = localStorage.getItem("cute-json-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (cuteJsonToken) {
      config.headers["cute-json-token"] = cuteJsonToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Do something with response error
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error
//       // e.g., redirect to login page or refresh token
//     }
//     return Promise.reject(error);
//   }
// );

export default Axios;
