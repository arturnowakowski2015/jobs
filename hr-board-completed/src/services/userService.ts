import axios from 'axios';

import { apiClient } from 'api/apiClient';

type UserResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
};

type UserUpdateRequest = {
  firstName: string;
  lastName: string;
};

const getCurrentUser = async () => {
  try {
    const { data } = await apiClient.get<UserResponse>('/users/me');
    return data;
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

const updateCurrentUser = async (user: UserUpdateRequest) => {
  try {
    await apiClient.put('/users/me', user);
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

export const userService = {
  getCurrentUser,
  updateCurrentUser,
};
