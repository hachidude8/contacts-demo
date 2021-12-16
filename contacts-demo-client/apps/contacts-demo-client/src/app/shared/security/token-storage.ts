import { TokenResponse } from './token-response';

const AUTH_STORAGE_KEY = 'auth_storage';

export const saveToken = (token: TokenResponse) => {
  const val = JSON.stringify(token);
  const b64Val = btoa(val);
  localStorage.setItem(AUTH_STORAGE_KEY, b64Val);
};

export const getToken = (): TokenResponse | undefined => {
  const b64Val = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!b64Val) {
    return undefined;
  }
  const val = atob(b64Val);
  return JSON.parse(val);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
