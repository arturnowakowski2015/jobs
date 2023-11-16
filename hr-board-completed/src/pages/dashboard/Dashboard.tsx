import { useQuery } from '@tanstack/react-query';
import { UserIcon } from '@heroicons/react/24/outline';

import { JOBS_QUERY_KEY, CANDIDATES_QUERY_KEY } from 'constants/constants';
import { jobsService } from 'services/jobsService';
import { candidatesService } from 'services/candidatesService';
import { Card } from 'components/card/Card';

import { Metric } from './components/Metric';
import { AnimatedNumber } from './components/AnimatedNumber';

export const Dashboard = () => {
  const { data: jobs } = useQuery(JOBS_QUERY_KEY, jobsService.getAll);
  const { data: candidates } = useQuery(
    CANDIDATES_QUERY_KEY,
    candidatesService.getAll,
  );

  const metricItems = [
    { id: 1, className: 'bg-blue-300', title: 'Employees', number: '245K' },
    {
      id: 2,
      className: 'bg-green-300',
      title: 'Candidates',
      number: candidates ? candidates.length : '???',
    },
    { id: 3, className: 'bg-orange-300', title: 'Employees', number: '245K' },
  ];

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex flex-col space-x-0 space-y-4 px-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Card className="basis-1/2 space-y-4 py-12">
          <p className="text-xl">Open positions</p>
          {jobs ? <AnimatedNumber maxNumber={jobs.length} /> : <p>???</p>}
        </Card>
        <Card className="basis-1/2 space-y-4 py-12">
          <p className="text-xl">Candidates</p>
          {candidates ? (
            <AnimatedNumber maxNumber={candidates.length} />
          ) : (
            <p>???</p>
          )}
        </Card>
      </div>
      <div className="px-4">
        <Card className="basis-full space-y-6 py-12">
          <p className="text-xl">General</p>
          <p>
            <b>Total 48,5% growth</b>
            {'   '}
            {'\uD83D\uDE0E'} this month
          </p>
          <div className="flex justify-between">
            {metricItems.map((metric) => {
              return (
                <Metric key={metric.id}>
                  <Metric.Icon className={metric.className}>
                    <UserIcon />
                  </Metric.Icon>
                  <Metric.Text>
                    <p className="text-sm text-gray-400">{metric.title}</p>
                    <p className="text-xl">{metric.number}</p>
                  </Metric.Text>
                </Metric>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
