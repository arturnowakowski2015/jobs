import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CANDIDATE_QUERY_KEY } from 'constants/constants';
import {
  candidatesService,
  type AddCandidatePayload,
} from 'services/candidatesService';

import { CandidateForm } from './components/CandidateForm';

export const EditCandidatePage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('JobPage must be rendered inside a route with id param');
  }

  const {
    data: candidate,
    isLoading,
    isError,
  } = useQuery(CANDIDATE_QUERY_KEY, () => {
    return candidatesService.getOne(id);
  });

  const queryClient = useQueryClient();

  const {
    error,
    mutate,
    isLoading: isEditing,
  } = useMutation({
    mutationFn: (formData: AddCandidatePayload) => {
      return candidatesService.editOne(id, formData);
    },
    onSuccess: () => {
      toast('Candidate successfully edited');
      queryClient.invalidateQueries(CANDIDATE_QUERY_KEY);
    },
  });

  if (isLoading) return <div>Loading candidate data...</div>;
  if (isError) return <div>Candidate not found</div>;

  const onSubmit = (formData: AddCandidatePayload) => {
    mutate(formData);
  };

  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <CandidateForm
      onSubmit={onSubmit}
      defaultValues={candidate}
      isLoading={isEditing}
      formError={errorMessage}
    />
  );
};
