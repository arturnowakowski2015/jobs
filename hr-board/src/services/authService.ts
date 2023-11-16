import axios from 'axios';

import { apiClient } from 'api/apiClient';

export type UserRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserLoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UserChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

const register = async (user: UserRegisterData) => {
  try {
    await apiClient.post('/auth/register', user);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message =
        error?.response?.status === 409
          ? 'This email is already used'
          : 'Registration failed. Try again';
    } else {
      message = 'Something went wrong';
    }

    throw new Error(message);
  }
};

const login = async (user: UserLoginData) => {
  const userCredentials = { email: user.email, password: user.password };
  try {
    const { data } = await apiClient.post('/auth/login', userCredentials);
    if (user.rememberMe) {
      localStorage.setItem('accessToken', data.accessToken);
    } else {
      sessionStorage.setItem('accessToken', data.accessToken);
    }
    localStorage.setItem('refreshToken', data.refreshToken);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message =
        error?.response?.status === 400
          ? 'Wrong login request. Try again'
          : 'Could not find such user in our database. Check if you entered proper data.';
    } else {
      message = 'Something went wrong';
    }
    throw new Error(message);
  }
};

const changePassword = async (password: UserChangePasswordData) => {
  try {
    await apiClient.post('/auth/change-password', password);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message =
        error?.response?.status === 401
          ? 'Unauthorized request'
          : 'User not found';
    } else {
      message = 'Something went wrong';
    }
    throw new Error(message);
  }
};

export const authService = {
  register,
  login,
  changePassword,
};
