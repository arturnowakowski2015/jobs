import type { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type FieldStyle = 'outline' | 'default';

type FormFieldProps<T extends FieldValues> = {
  path: Path<T>;
  fieldStyle?: FieldStyle;
  type: string;
  name: string;
  register: UseFormRegister<T>;
  error?: string;
  disabled?: boolean;
};

export const FormField = <T extends FieldValues>({
  path,
  type,
  fieldStyle = 'default',
  name,
  register,
  error,
  disabled,
}: FormFieldProps<T>) => {
  const commonInputClassName = twMerge(
    'peer bottom-2 block w-full focus:border-black focus:outline-none px-2',
    error && 'border-red-500 text-red-500 focus:border-red-500',
    disabled && 'text-gray-500',
  );

  const inputClassNameVariant: Record<FieldStyle, string> = {
    default: 'border-b-2 py-2 text-lg',
    outline: 'text-sm rounded-md border-2 border-gray-300 bg-transparent py-4',
  };

  const commonLabelClassName = twMerge(
    'absolute top-0 z-10 origin-[0] scale-75 transform text-gray-900 duration-200 p-2',
    'peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400',
    'peer-focus:scale-75 peer-focus:text-gray-900',
    error && 'text-red-500 peer-focus:text-red-500',
  );

  const labelClassNameVariant: Record<FieldStyle, string> = {
    default: twMerge(
      '-translate-y-6',
      'peer-placeholder-shown:translate-y-0',
      'peer-focus:-translate-y-6',
    ),
    outline: twMerge(
      'left-4 -translate-y-5 bg-gray-100',
      'peer-placeholder-shown:translate-y-2 peer-placeholder-shown:bg-transparent',
      'peer-focus:-translate-y-5 peer-focus:bg-gray-100',
    ),
  };

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea
          className={twMerge(
            commonInputClassName,
            inputClassNameVariant[fieldStyle],
            'resize-none',
          )}
          id={path}
          placeholder=" "
          rows={4}
          disabled={disabled}
          {...register(path)}
        />
      ) : (
        <input
          className={twMerge(
            commonInputClassName,
            inputClassNameVariant[fieldStyle],
          )}
          id={path}
          placeholder=" "
          type={type}
          disabled={disabled}
          {...register(path)}
        />
      )}

      <label
        htmlFor={path}
        className={twMerge(
          commonLabelClassName,
          labelClassNameVariant[fieldStyle],
        )}
      >
        {name}
      </label>
      {error && <p className="py-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
