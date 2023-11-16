import { twMerge } from 'tailwind-merge';

type IconProps = {
  children: React.ReactNode;
  className: string;
};

const Icon = ({ children, className }: IconProps) => {
  return (
    <div
      className={twMerge('h-12 w-12 overflow-hidden rounded-md p-3', className)}
    >
      {children}
    </div>
  );
};

type TextType = {
  children: React.ReactNode;
};

const Text = ({ children }: TextType) => {
  return <div className="flex flex-col">{children}</div>;
};

type MetricProps = {
  children: React.ReactNode[];
};

export const Metric = ({ children }: MetricProps) => {
  return <div className="flex space-x-4">{children}</div>;
};

Metric.Icon = Icon;
Metric.Text = Text;
