import axios, { AxiosResponse } from "axios";
// import { cookies } from "next/headers"; // 👈 나중에 필요할 때 주석 해제하세요

export interface APIResponseType<T> {
  isSuccess: boolean;
  isFailure: boolean;
  data?: T;
}

export const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

instance.interceptors.request.use(
  function (config) {
    // 🔒 로그인 및 쿠키 설정 후 아래 코드 사용하세요
    // const token = cookies().get("token")?.value;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   config.headers["Content-Type"] = "application/json";
    // }

    // 👇 기본 Content-Type만 설정해두기
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
