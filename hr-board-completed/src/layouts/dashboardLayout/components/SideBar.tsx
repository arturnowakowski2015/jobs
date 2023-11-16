import { twMerge } from 'tailwind-merge';
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

import { routes } from 'router/routes';
import type { Path } from 'router/routes';

import { NavButton } from './NavButton';

type NavItem = { icon: React.ReactNode; title: string; path: Path };

const navItems: NavItem[] = [
  { icon: <HomeIcon />, title: 'Home', path: routes.dashboard },
  { icon: <ChatBubbleLeftIcon />, title: 'Jobs', path: routes.jobs },
  { icon: <UserIcon />, title: 'Candidates', path: routes.candidates },
  { icon: <CalendarIcon />, title: 'Calendar', path: routes.home },
];

type SideBarProps = {
  matches: boolean;
  open: boolean;
};

export const SideBar = ({ matches, open }: SideBarProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col transition-all duration-200',
        matches &&
          (!open
            ? 'w-0 opacity-0'
            : 'absolute left-0 top-0 z-50 h-full w-full bg-gray-100  opacity-100'),
      )}
    >
      {navItems.map((navItem) => {
        return (
          <NavButton
            key={navItem.title}
            path={navItem.path}
            className="rounded-r-full"
          >
            <NavButton.Icon>{navItem.icon}</NavButton.Icon>
            <NavButton.Title>{navItem.title}</NavButton.Title>
          </NavButton>
        );
      })}
    </div>
  );
};
