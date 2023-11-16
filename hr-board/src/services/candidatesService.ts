import axios from 'axios';

import { apiClient } from 'api/apiClient';

export type Candidate = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  position: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  companyName: string;
};
type CandidatesResponse = Candidate[];

export type AddCandidatePayload = {
  name: string;
  position: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  companyName: string;
};

const getAll = async () => {
  try {
    const { data } = await apiClient.get<CandidatesResponse>('/candidates');
    return data;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message =
        error?.response?.status === 401
          ? 'Unauthorized request'
          : 'Something went wrong';
    } else {
      message = 'Something went wrong';
    }
    throw new Error(message);
  }
};

const getOne = async (id: string) => {
  try {
    const { data } = await apiClient.get<Candidate>(`/candidates/${id}`);
    return data;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message =
        error?.response?.status === 401
          ? 'Unauthorized request'
          : 'Candidate not found';
    } else {
      message = 'Something went wrong';
    }
    throw new Error(message);
  }
};

const addOne = async (candidate: AddCandidatePayload) => {
  try {
    await apiClient.post('/candidates', candidate);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not add new candidate. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not add new candidate';
      }
    } else {
      message = 'Something went wrong. Could not add new candidate';
    }
    throw new Error(message);
  }
};

const editOne = async (id: string, candidate: AddCandidatePayload) => {
  try {
    await apiClient.patch(`/candidates/${id}`, candidate);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not edit this candidate. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not edit this candidate';
      }
    } else {
      message = 'Something went wrong. Could not edit this candidate';
    }
    throw new Error(message);
  }
};

const deleteOne = async (id: string) => {
  try {
    await apiClient.delete(`/candidates/${id}`);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not delete this candidate. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not delete this candidate';
      }
    } else {
      message = 'Something went wrong. Could not delete this candidate';
    }
    throw new Error(message);
  }
};

const deleteMany = async (ids: string[]) => {
  try {
    await Promise.all(
      ids.map(async (id) => {
        await apiClient.delete(`/candidates/${id}`);
      }),
    );
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not delete this candidates. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not delete this candidates';
      }
    } else {
      message = 'Something went wrong. Could not delete this candidates';
    }
    throw new Error(message);
  }
};

export const candidatesService = {
  getAll,
  getOne,
  addOne,
  editOne,
  deleteOne,
  deleteMany,
};
