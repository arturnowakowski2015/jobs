import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

import { FormField } from 'components/form';
import { Button } from 'components/buttons';
import type { AddJobPayload } from 'services/jobsService';

const MAX_LONG_DESCRIPTION_LENGTH = 100;

const validationSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: 'Title must have at least 3 characters' }),
    companyName: z
      .string()
      .min(5, { message: 'Company name must have at least 5 characters' }),
    logo: z
      .string()
      .min(5, { message: 'Logo url must have at least 5 characters' }),
    shortDescription: z.string().min(5, {
      message: 'Short description name must have at least 5 characters',
    }),
    longDescription: z
      .string()
      .min(5, {
        message: 'Long description name must have at least 5 characters',
      })
      .max(MAX_LONG_DESCRIPTION_LENGTH, {
        message: `Long description must have maximum ${MAX_LONG_DESCRIPTION_LENGTH} characters`,
      }),
  })
  .required();
type ValidationSchema = z.infer<typeof validationSchema>;

type Props = {
  onSubmit: SubmitHandler<ValidationSchema>;
  defaultValues?: ValidationSchema;
  isLoading?: boolean;
  readonly?: boolean;
  formError?: string | undefined;
};

const dirtyValues = (
  dirtyFields: Record<string, unknown>,
  allValues: Record<string, unknown>,
) => {
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => {
      return [key, allValues[key]];
    }),
  ) as AddJobPayload;
};

const EMPTY_JOB_FORM: ValidationSchema = {
  logo: '',
  title: '',
  companyName: '',
  longDescription: '',
  shortDescription: '',
};

export const JobForm = ({
  readonly,
  onSubmit,
  defaultValues,
  isLoading,
  formError,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues ?? EMPTY_JOB_FORM,
  });

  const watchLongDescription = watch('longDescription');

  return (
    <div className="w-full px-8">
      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit((data) => {
          const patch = dirtyValues(dirtyFields, data);
          reset(data, { keepDirty: true });
          return onSubmit(patch);
        })}
      >
        <div className="flex space-x-4">
          <div className="flex basis-1/2 flex-col space-y-4">
            <FormField
              disabled={readonly}
              fieldStyle="outline"
              path="title"
              type="text"
              name="job title"
              register={register}
              error={errors?.title?.message}
            />
            <FormField
              disabled={readonly}
              fieldStyle="outline"
              path="companyName"
              type="text"
              name="company name"
              register={register}
              error={errors?.companyName?.message}
            />
            <FormField
              disabled={readonly}
              fieldStyle="outline"
              path="logo"
              type="text"
              name="logo"
              register={register}
              error={errors?.logo?.message}
            />
          </div>
          <div className="relative flex basis-1/2 flex-col space-y-4">
            <FormField
              disabled={readonly}
              fieldStyle="outline"
              path="shortDescription"
              type="text"
              name="short description"
              register={register}
              error={errors?.shortDescription?.message}
            />
            <FormField
              disabled={readonly}
              fieldStyle="outline"
              path="longDescription"
              type="textarea"
              name="long description"
              register={register}
              error={errors?.longDescription?.message}
            />
            <div
              className={twMerge(
                'self-end',
                watchLongDescription.length > MAX_LONG_DESCRIPTION_LENGTH &&
                  'text-red-500',
              )}
            >
              {watchLongDescription.length} / {MAX_LONG_DESCRIPTION_LENGTH}
            </div>
          </div>
        </div>
        {formError && <p className="text-red-500">{formError}</p>}
        <Button type="submit" disabled={isLoading || readonly}>
          {readonly ? 'READ ONLY' : 'SUBMIT'}
        </Button>
      </form>
    </div>
  );
};
