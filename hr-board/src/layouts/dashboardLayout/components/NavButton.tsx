import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import type { Path } from 'router/routes';

type IconProps = {
  children: React.ReactNode;
};

const Icon = ({ children }: IconProps) => {
  return <div className="mr-4 h-5 w-5">{children}</div>;
};

type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return <p>{children}</p>;
};

type NavButtonProps = {
  children: React.ReactNode;
  className?: string;
  path: Path;
};

export const NavButton = ({ path, className, children }: NavButtonProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return twMerge(
          isActive
            ? 'bg-blue-300  hover:bg-blue-200'
            : 'bg-transparent  hover:bg-blue-200',
          className,
        );
      }}
    >
      <div className="flex items-center py-4 pl-6 pr-16">{children}</div>
    </NavLink>
  );
};

NavButton.Icon = Icon;
NavButton.Title = Title;
