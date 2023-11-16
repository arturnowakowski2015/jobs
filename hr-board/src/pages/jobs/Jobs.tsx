import { useQuery } from '@tanstack/react-query';

import { JOBS_QUERY_KEY } from 'constants/constants';
import { jobsService } from 'services/jobsService';

import { JobsTable } from './components/JobsTable';

export const Jobs = () => {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: JOBS_QUERY_KEY,
    queryFn: jobsService.getAll,
  });

  if (isLoading) return <div>Loading jobs...</div>;
  if (isError) return <div>{`Could'n load jobs`}</div>;
  if (jobs.length === 0) return <div>No open jobs</div>;

  return (
    <div className="w-full">
      <JobsTable jobs={jobs} />
    </div>
  );
};
