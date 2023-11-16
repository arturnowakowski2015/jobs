import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Menu } from './Menu';

type Props = {
  matches: boolean;
  openNavigation: boolean;
  onToggleNavigation: () => void;
};

export const Header = ({
  matches,
  openNavigation,
  onToggleNavigation,
}: Props) => {
  return (
    <div className="flex justify-between px-4 py-2">
      {matches ? (
        <button
          className="h-12 w-12 p-2 text-gray-600 transition-all duration-150 hover:scale-110 hover:text-black"
          onClick={() => {
            onToggleNavigation();
          }}
        >
          {openNavigation ? <XMarkIcon /> : <Bars3Icon />}
        </button>
      ) : (
        <p className="self-center">HR_Analytics</p>
      )}
      <Menu />
    </div>
  );
};
