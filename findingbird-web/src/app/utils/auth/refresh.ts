// utils/refresh.ts

import { API_PATH } from '../http/api-query';
import { setAccessToken, removeAccessToken } from './token';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${API_PATH}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // refreshToken은 HttpOnly 쿠키로 자동 포함됨
    });

    if (!res.ok) throw new Error('리프레시 실패');

    const { accessToken } = await res.json();
    setAccessToken(accessToken);
    return accessToken;
  } catch (err) {
    console.error('[토큰 갱신 실패]', err);
    removeAccessToken();
    return null;
  }
};
