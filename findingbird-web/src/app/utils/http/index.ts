import axios, { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../auth/refresh';
import { redirect } from 'next/navigation'; // ✅ 서버 리디렉트용

export const createHttpInstance = (isServer: boolean): AxiosInstance => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = isServer
      ? cookies().get('accessToken')?.value
      : Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // ✅ 클라이언트에서 401 → 토큰 갱신 시도
      if (error.response?.status === 401 && !originalRequest._retry && !isServer) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          Cookies.set('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }

        Cookies.remove('accessToken');
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/';
      }

      // ✅ 서버에서 401 → 바로 리디렉트
      if (error.response?.status === 401 && isServer) {
       redirect('/'); // 서버 리디렉트
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
