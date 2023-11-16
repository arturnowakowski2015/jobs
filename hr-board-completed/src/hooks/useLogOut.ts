import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { routes } from 'router/routes';

export const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    queryClient.clear();
    navigate(routes.signin);
  };

  return { logOut };
};
