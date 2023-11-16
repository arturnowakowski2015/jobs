import { useQuery } from '@tanstack/react-query';

import { CANDIDATES_QUERY_KEY } from 'constants/constants';
import { candidatesService } from 'services/candidatesService';

import { CandidatesTable } from './components/CandidatesTable';

export const Candidates = () => {
  const {
    data: candidates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: CANDIDATES_QUERY_KEY,
    queryFn: candidatesService.getAll,
  });

  if (isLoading) return <div>Loading candidates data...</div>;
  if (isError) return <div>{`Could'n load candidates data`}</div>;
  if (candidates.length === 0) return <div>No candidates</div>;

  return (
    <div className="w-full">
      <CandidatesTable candidates={candidates} />
    </div>
  );
};
