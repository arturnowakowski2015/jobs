import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export type Action = {
  name: string;
  action: (ids: string[]) => void;
};

type Props = {
  selected: string[];
  clearSelected: () => void;
  menuActions: Action[];
};

export const ActionsMenu = ({
  selected,
  clearSelected,
  menuActions,
}: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const disabled = selected.length === 0;

  return (
    <DropdownMenu.Root onOpenChange={setOpenMenu}>
      <DropdownMenu.Trigger
        className={twMerge(
          'flex items-center rounded-md border-2 border-gray-500 px-4 py-2',
          disabled && 'border-gray-200 text-gray-500',
        )}
        disabled={disabled}
      >
        <p className="mr-2">Actions</p>
        {openMenu ? (
          <ChevronUpIcon className="h-3 w-3" />
        ) : (
          <ChevronDownIcon className="h-3 w-3" />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="rounded-md bg-white shadow-lg">
          <DropdownMenu.Item className="px-6 py-2 hover:bg-blue-200">
            Actions
          </DropdownMenu.Item>
          {menuActions.map((action) => {
            return (
              <DropdownMenu.Item
                key={action.name}
                className="px-6 py-2 hover:bg-blue-200"
                onSelect={() => {
                  action.action(selected);
                  clearSelected();
                }}
              >
                {action.name}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
