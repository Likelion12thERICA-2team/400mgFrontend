// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://port-0-backend400mg-temp-jvpb2mlof9h57p.sel5.cloudtype.app/",
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

  const access_token = localStorage.getItem("access_token");

  try {
    //API 요청
    const response = await apiClient.post("users/", data, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  //응답처리
};
