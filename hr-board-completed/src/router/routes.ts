export const routes = {
  home: '/',
  signup: '/signup',
  signin: '/signin',
  dashboard: '/dashboard',
  profile: '/profile',
  jobs: '/jobs',
  job: '/jobs/:id',
  addjob: '/jobs/add',
  editjob: '/jobs/:id/edit',
  candidates: '/candidates',
  candidate: '/candidates/:id',
  addCandidate: '/candidates/add',
  editCandidate: '/candidates/:id/edit',
} as const;

export type Route = keyof typeof routes;
export type Path = (typeof routes)[Route];
