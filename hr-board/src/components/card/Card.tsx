import { twMerge } from 'tailwind-merge';

type Props = {
  className: string;
  children: React.ReactNode;
};

export const Card = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        'rounded-md border-2 bg-white p-8 shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
};
