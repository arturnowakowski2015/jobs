import { twMerge } from 'tailwind-merge';

type Props = {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button = ({ type, disabled, className, children }: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        'rounded-md bg-orange-500 px-6 py-2 text-center text-lg text-white shadow-md',
        'hover:cursor-pointer hover:bg-orange-600 hover:shadow-lg',
        'disabled:cursor-auto disabled:bg-orange-300 disabled:text-gray-700 disabled:shadow-md',
        className,
      )}
    >
      {children}
    </button>
  );
};
