import axios from 'axios';

import { apiClient } from 'api/apiClient';
import type { Language } from 'types/jobTypes';

type PublicJobsResponse = {
  languages: Language[];
};

const getAllPublic = async () => {
  try {
    alert(JSON.stringify(apiClient));
    const response = await apiClient.get<PublicJobsResponse>('/jobs/public');
    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
};

type JobStatus = 'OPEN' | 'CLOSED';
export const JOB_STATUS_TO_COPY: Record<JobStatus, string> = {
  OPEN: 'Open',
  CLOSED: 'Closed',
};
export type Job = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  companyName: string;
  status: JobStatus;
};
type JobsResponse = Job[];

export type AddJobPayload = {
  title: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  companyName: string;
};

const getAll = async () => {
  try {
    const { data } = await apiClient.get<JobsResponse>('/jobs');
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
    const { data } = await apiClient.get<Job>(`/jobs/${id}`);
    return data;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      message =
        error?.response?.status === 401
          ? 'Unauthorized request'
          : 'Job not found';
    } else {
      message = 'Something went wrong';
    }
    throw new Error(message);
  }
};

const addOne = async (job: AddJobPayload) => {
  try {
    await apiClient.post('/jobs', job);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not add new job. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not add new job';
      }
    } else {
      message = 'Something went wrong. Could not add new job';
    }
    throw new Error(message);
  }
};

const editOne = async (id: string, job: AddJobPayload) => {
  try {
    await apiClient.patch(`/jobs/${id}`, job);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not edit this job. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not edit this job';
      }
    } else {
      message = 'Something went wrong. Could not edit this job';
    }
    throw new Error(message);
  }
};

const deleteOne = async (id: string) => {
  try {
    await apiClient.delete(`/jobs/${id}`);
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not delete this job. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not delete this job';
      }
    } else {
      message = 'Something went wrong. Could not delete this job';
    }
    throw new Error(message);
  }
};

const deleteMany = async (ids: string[]) => {
  try {
    await Promise.all(
      ids.map(async (id) => {
        await apiClient.delete(`/jobs/${id}`);
      }),
    );
  } catch (error) {
    let message;
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        message = `Could not delete this jobs. ${error.response.data.message}`;
      } else {
        message =
          error?.response?.status === 401
            ? 'Unauthorized request'
            : 'Something went wrong. Could not delete this jobs';
      }
    } else {
      message = 'Something went wrong. Could not delete this jobs';
    }
    throw new Error(message);
  }
};

export const jobsService = {
  getAllPublic,
  getAll,
  getOne,
  addOne,
  editOne,
  deleteOne,
  deleteMany,
};
