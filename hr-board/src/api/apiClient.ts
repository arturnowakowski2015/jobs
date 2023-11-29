import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

export const apiClient = axios.create({
  baseURL: 'http://localhost:9595',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const token =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

createAuthRefreshInterceptor(apiClient, async () => {
  const refreshTokenFromStorage = localStorage.getItem('refreshToken');

  if (!refreshTokenFromStorage) {
    return Promise.reject();
  }

  const refreshTokenAxiosConfig: AxiosAuthRefreshRequestConfig = {
    skipAuthRefresh: true,
  };

  const {
    data: { accessToken, refreshToken },
  } = await apiClient.post(
    '/auth/refresh-token',
    {
      refreshToken: refreshTokenFromStorage,
    },
    refreshTokenAxiosConfig,
  );

  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('accessToken', accessToken);
  return null;
});
