import { createBrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { AuthGuard } from 'auth/AuthGuard';
import { UnAuthGuard } from 'auth/UnAuthGuard';
import { Homepage } from 'pages/home/Homepage';
import { Signup } from 'pages/signup/Signup';
import { Signin } from 'pages/signin/Signin';
import { Dashboard } from 'pages/dashboard/Dashboard';
import { DashboardLayout } from 'layouts/dashboardLayout/DashboardLayout';
import { AuthLayout } from 'layouts/AuthLayout';
import { Profile } from 'pages/profile/Profile';
import { Jobs } from 'pages/jobs/Jobs';
import { JobPage } from 'pages/jobs/JobPage';
import { EditJobPage } from 'pages/jobs/EditJobPage';
import { AddJobPage } from 'pages/jobs/AddJobPage';
import { Candidates } from 'pages/candidates/Candidates';
import { CandidatePage } from 'pages/candidates/CandidatePage';
import { EditCandidatePage } from 'pages/candidates/EditCandidatePage';
import { AddCandidatePage } from 'pages/candidates/AddCandidatePage';

import { routes } from './routes';

type Props = {
  title: string;
  children: React.ReactNode;
};
const Page = ({ title, children }: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <UnAuthGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: routes.home,
            element: (
              <Page title="HR Analytics">
                <Homepage />
              </Page>
            ),
          },
          {
            path: routes.signup,
            element: (
              <Page title="HR Dashboard - Sign Up">
                <Signup />
              </Page>
            ),
          },
          {
            path: routes.signin,
            element: (
              <Page title="HR Dashboard - Sign In">
                <Signin />
              </Page>
            ),
          },
        ],
      },
    ],
  },

  {
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: routes.dashboard,
            element: (
              <Page title="HR Dashboard - Dashboard">
                <Dashboard />
              </Page>
            ),
          },
          {
            path: routes.profile,
            element: (
              <Page title="HR Dashboard - Profile">
                <Profile />
              </Page>
            ),
          },
          {
            path: routes.jobs,
            element: (
              <Page title="HR Dashboard - Jobs">
                <Jobs />
              </Page>
            ),
          },
          {
            path: routes.job,
            element: <JobPage />,
          },
          {
            path: routes.addjob,
            element: (
              <Page title="HR Dashboard - Add Job">
                <AddJobPage />
              </Page>
            ),
          },
          {
            path: routes.editjob,
            element: (
              <Page title="HR Dashboard - Edit Job">
                <EditJobPage />
              </Page>
            ),
          },
          {
            path: routes.candidates,
            element: (
              <Page title="HR Dashboard - Candidates">
                <Candidates />
              </Page>
            ),
          },
          {
            path: routes.candidate,
            element: <CandidatePage />,
          },
          {
            path: routes.editCandidate,
            element: (
              <Page title="HR Dashboard - Edit Candidate">
                <EditCandidatePage />
              </Page>
            ),
          },
          {
            path: routes.addCandidate,
            element: (
              <Page title="HR Dashboard - Add Candidate">
                <AddCandidatePage />
              </Page>
            ),
          },
        ],
      },
    ],
  },
]);
