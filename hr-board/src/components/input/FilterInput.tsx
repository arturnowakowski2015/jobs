import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  searchValue: string;
  onChangeSearch: (input: string) => void;
};

export const FilterInput = ({ searchValue, onChangeSearch }: Props) => {
  return (
    <div className="flex items-center">
      <input
        className="rounded-md border-2 border-gray-300 px-4 py-2 outline-none focus:border-orange-400"
        placeholder="Filter"
        value={searchValue}
        onChange={(e) => {
          onChangeSearch(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onChangeSearch('');
        }}
      >
        {searchValue.length > 0 && (
          <XMarkIcon className="z-10 h-6 w-6 -translate-x-8 hover:scale-110" />
        )}
      </button>
    </div>
  );
};
