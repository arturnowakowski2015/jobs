import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { jobsService, type AddJobPayload } from 'services/jobsService';
import { routes } from 'router/routes';

import { JobForm } from './components/JobForm';

export const AddJobPage = () => {
  const navigate = useNavigate();

  const { error, isLoading, mutate } = useMutation({
    mutationFn: jobsService.addOne,
    onSuccess: () => {
      toast('Job successfully created');
      navigate(routes.jobs);
    },
  });

  const onSubmit = (formData: AddJobPayload) => {
    mutate(formData);
  };

  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <JobForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      formError={errorMessage}
    />
  );
};
