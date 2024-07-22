import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.example.com",
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
