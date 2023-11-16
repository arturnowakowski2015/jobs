import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  candidatesService,
  type AddCandidatePayload,
} from 'services/candidatesService';
import { routes } from 'router/routes';

import { CandidateForm } from './components/CandidateForm';

export const AddCandidatePage = () => {
  const navigate = useNavigate();

  const { error, isLoading, mutate } = useMutation({
    mutationFn: candidatesService.addOne,
    onSuccess: () => {
      toast('Candidate successfully created');
      navigate(routes.candidates);
    },
  });

  const onSubmit = (formData: AddCandidatePayload) => {
    mutate(formData);
  };

  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <CandidateForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      formError={errorMessage}
    />
  );
};
