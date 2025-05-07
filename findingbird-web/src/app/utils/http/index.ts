// utils/http/instance.ts
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
      ? cookies().get('token')?.value
      : Cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //config.headers['Content-Type'] = 'application/json';
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
          Cookies.set('token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }

        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Usage example:
// import { createHttpInstance } from './instance';
// const instance = createHttpInstance(typeof window === 'undefined');
