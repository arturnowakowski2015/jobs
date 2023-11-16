import { useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { useLogOut } from 'hooks/useLogOut';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { formatInitials } from 'utils/formatInitials';
import { routes } from 'router/routes';

export const Menu = () => {
  const { logOut } = useLogOut();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const initials = formatInitials(currentUser);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="h-12 w-12 rounded-full bg-blue-200 p-2 text-gray-600 transition-all duration-150 hover:scale-110 hover:text-black">
        {initials}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-4 overflow-hidden rounded-lg bg-blue-100 shadow-md">
          <DropdownMenu.Item disabled>
            <div className="flex items-center py-4 pl-6 pr-16 ">
              <div className="mr-4 flex h-5 w-5 items-center justify-center">
                {initials}
              </div>
              <p>
                {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center py-4 pl-6 pr-16 hover:cursor-pointer hover:bg-blue-200"
            onSelect={() => {
              navigate(routes.profile);
            }}
          >
            <div className="mr-4 h-5 w-5">
              <UserIcon />
            </div>
            <p>Profile</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center py-4 pl-6 pr-16 hover:cursor-pointer hover:bg-blue-200"
            onSelect={logOut}
          >
            <div className="mr-4 h-5 w-5">
              <ArrowLeftOnRectangleIcon />
            </div>
            <p>Log Out</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
