import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { LinkButton } from 'components/buttons';
import { CANDIDATE_QUERY_KEY } from 'constants/constants';
import { candidatesService } from 'services/candidatesService';
import { formatDateCreatedAt } from 'utils/formatDateCreatedAt';

export const CandidatePage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error(
      'CandidatePage must be rendered inside a route with id param',
    );
  }

  const {
    data: candidate,
    isLoading,
    isError,
  } = useQuery(CANDIDATE_QUERY_KEY, () => {
    return candidatesService.getOne(id);
  });

  if (isLoading) return <div>Loading candidates data...</div>;
  if (isError) return <div>Candidate not found</div>;

  return (
    <div className="flex flex-col space-y-2 px-6">
      <Helmet>
        <title>HR Dashboard - {candidate.name}</title>
      </Helmet>
      <h1 className="mb-4 text-3xl">User: {candidate.name}</h1>
      <p>Created at: {formatDateCreatedAt(candidate.createdAt)}</p>
      <p>Position: {candidate.position}</p>
      <div className="self-start">
        <LinkButton path={`/candidates/${candidate.id}/edit`}>EDIT</LinkButton>
      </div>
    </div>
  );
};
