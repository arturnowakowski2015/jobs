import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="mx-auto w-full rounded-md border-2 p-4 shadow-lg sm:my-12 sm:w-2/3 sm:p-8">
      <Outlet />
    </div>
  );
};
