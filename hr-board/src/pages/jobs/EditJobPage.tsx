import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { JOB_QUERY_KEY } from 'constants/constants';
import { jobsService, type AddJobPayload } from 'services/jobsService';

import { JobForm } from './components/JobForm';

export const EditJobPage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('JobPage must be rendered inside a route with id param');
  }

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery(JOB_QUERY_KEY, () => {
    return jobsService.getOne(id);
  });

  const queryClient = useQueryClient();

  const {
    error,
    mutate,
    isLoading: isEditing,
  } = useMutation({
    mutationFn: (formData: AddJobPayload) => {
      return jobsService.editOne(id, formData);
    },
    onSuccess: () => {
      toast('Job successfully edited');
      queryClient.invalidateQueries(JOB_QUERY_KEY);
    },
  });

  if (isLoading) return <div>Loading job data...</div>;
  if (isError) return <div>Job not found</div>;

  const onSubmit = (formData: AddJobPayload) => {
    mutate(formData);
  };

  const errorMessage = error instanceof Error ? error.message : undefined;

  const readonly = job.status === 'CLOSED';

  return (
    <JobForm
      readonly={readonly}
      onSubmit={onSubmit}
      defaultValues={job}
      isLoading={isEditing}
      formError={errorMessage}
    />
  );
};
