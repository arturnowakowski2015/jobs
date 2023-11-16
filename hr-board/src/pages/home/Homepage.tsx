import { useQuery } from '@tanstack/react-query';

import { jobsService } from 'services/jobsService';
import { Tree } from 'components/tree';
import { LinkButton } from 'components/buttons';
import { PUBLIC_JOBS_QUERY_KEY as queryKey } from 'constants/constants';
import type { TreeItem } from 'components/tree';
import { routes } from 'router/routes';

const HomepageJobs = () => {
  const { isLoading, isError, data } = useQuery(
    queryKey,
    jobsService.getAllPublic,
  );
  if (isLoading) {
    return <p className="mx-4">Loading jobs...</p>;
  }
  if (isError) {
    return <p className="mx-4">{`Couldn't fetch jobs`}</p>;
  }

  const treeData: TreeItem[] = data.languages.map((language) => {
    return {
      content: language.name,
      subtree: language.frameworks?.map((framework) => {
        return {
          content: framework.name,
          subtree: framework.levels?.map((level) => {
            return {
              content: level.name,
              subtree: level.projects?.map((project) => {
                return {
                  content: project.name,
                };
              }),
            };
          }),
        };
      }),
    };
  });

  return <Tree data={treeData} />;
};

export const Homepage = () => {
  return (
    <>
      <h1 className="mb-6 mt-2 text-5xl sm:text-6xl">HR Analytics</h1>
      <div className="my-8 flex gap-x-4">
        <LinkButton path={routes.signin}>SIGN IN</LinkButton>
        <LinkButton path={routes.signup}>SIGN UP</LinkButton>
      </div>
      <h5 className="my-8 text-lg sm:text-xl">
        {`We're looking for specialists in those technologies:`}
      </h5>
      <HomepageJobs />
    </>
  );
};
