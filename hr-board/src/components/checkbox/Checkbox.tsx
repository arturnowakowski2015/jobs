import { twMerge } from 'tailwind-merge';

type Props = {
  onChange: () => void;
  isChecked: boolean;
  isPartialyChecked?: boolean;
};

export const Checkbox = ({ onChange, isChecked, isPartialyChecked }: Props) => {
  return (
    <div className="flex items-center justify-center p-2">
      <input
        type="checkbox"
        className={twMerge(
          'h-5 w-5 checked:accent-blue-200  hover:scale-110',
          isPartialyChecked && 'checked:accent-gray-300',
        )}
        onChange={onChange}
        checked={isChecked}
      />
    </div>
  );
};
