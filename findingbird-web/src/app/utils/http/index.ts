import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

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
    const token = cookies().get("token")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
