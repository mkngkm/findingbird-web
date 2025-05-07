// utils/token.ts
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const getAccessToken = () => Cookies.get(TOKEN_KEY);

export const setAccessToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    secure: true,
    sameSite: 'Lax',
    path: '/',
  });
};

export const removeAccessToken = () => {
  Cookies.remove(TOKEN_KEY);
};
