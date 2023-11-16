import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
  children: React.ReactNode;
};

export const LinkButton = ({ path, children }: Props) => {
  return (
    <NavLink
      to={path}
      className="flex items-center rounded-md bg-green-500
    px-6 py-3
    text-[#f1f1f1] shadow-md
    hover:bg-green-600 hover:shadow-2xl"
    >
      {children}
    </NavLink>
  );
};
