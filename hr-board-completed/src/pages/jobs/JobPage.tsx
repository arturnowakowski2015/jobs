import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { JOB_QUERY_KEY } from 'constants/constants';
import { jobsService, JOB_STATUS_TO_COPY } from 'services/jobsService';
import { formatDateCreatedAt } from 'utils/formatDateCreatedAt';
import { LinkButton } from 'components/buttons';

export const JobPage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('JobPage must be rendered inside a route with id param');
  }

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery(JOB_QUERY_KEY, () => {
    const jobId = id;
    return jobsService.getOne(jobId);
  });

  if (isLoading) return <div>Loading jobs data...</div>;
  if (isError) return <div>Job not found</div>;

  return (
    <div className="flex flex-col space-y-2 px-6">
      <Helmet>
        <title>HR Dashboard - {job.title}</title>
      </Helmet>
      <h1 className="mb-4 text-3xl">Job: {job.title}</h1>
      <p>Created at: {formatDateCreatedAt(job.createdAt)}</p>
      <p>Status: {JOB_STATUS_TO_COPY[job.status]}</p>
      <p>Description: {job.longDescription}</p>
      <div className="self-start">
        <LinkButton path={`/jobs/${job.id}/edit`}>EDIT</LinkButton>
      </div>
    </div>
  );
};
