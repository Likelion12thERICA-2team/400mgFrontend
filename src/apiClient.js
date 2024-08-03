// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://13.209.186.104/",
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;

// import apiClient from "./apiClient";

//예시
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    nickname: "nickname",
    password: "password",
  };

  try {
    //API 요청
    const response = await apiClient.post("users/", data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  //응답처리
};
