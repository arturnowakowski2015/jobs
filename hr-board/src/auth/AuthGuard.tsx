import { useQuery } from '@tanstack/react-query';
import { Outlet, Navigate } from 'react-router-dom';

import { USER_ME_QUERY_KEY } from 'constants/constants';
import { userService } from 'services/userService';
import { CurrentUserProvider } from 'hooks/useCurrentUser';
import { routes } from 'router/routes';

export const AuthGuard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: USER_ME_QUERY_KEY,
    queryFn: userService.getCurrentUser,
    retry: false,
  });

  if (isLoading) return <div>Loading user data...</div>;
  if (isError) {
    return <Navigate to={routes.signin} replace />;
  }

  return (
    <CurrentUserProvider currentUser={data}>
      <Outlet />
    </CurrentUserProvider>
  );
};
