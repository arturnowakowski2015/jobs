import { useQuery } from '@tanstack/react-query';
import { Outlet, Navigate } from 'react-router-dom';

import { USER_ME_QUERY_KEY } from 'constants/constants';
import { userService } from 'services/userService';
import { routes } from 'router/routes';

export const UnAuthGuard = () => {
  const { isSuccess } = useQuery({
    queryKey: USER_ME_QUERY_KEY,
    queryFn: userService.getCurrentUser,
    retry: false,
  });

  if (isSuccess) {
    return <Navigate to={routes.dashboard} replace />;
  }

  return <Outlet />;
};
