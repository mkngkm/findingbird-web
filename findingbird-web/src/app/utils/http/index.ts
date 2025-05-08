import axios, { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../auth/refresh';

export const createHttpInstance = (isServer: boolean): AxiosInstance => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = isServer
      ? cookies().get('accessToken')?.value // ✅ 서버에서는 next/headers로 읽기
      : Cookies.get('accessToken');        // ✅ 클라이언트에서는 js-cookie로 읽기

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry && !isServer) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          Cookies.set('accessToken', newAccessToken); // ✅ 이름 통일
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }

        Cookies.remove('accessToken');
        window.location.href = '/';

      }

      return Promise.reject(error);
    }
  );

  return instance;
};
