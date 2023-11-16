import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemas } from 'constants/schemas';
import { authService } from 'services/authService';
import { FormField } from 'components/form';
import { Button } from 'components/buttons';
import { useLogOut } from 'hooks/useLogOut';

const validationSchema = z
  .object({
    oldPassword: schemas.passwordSchema,
    newPassword: schemas.passwordSchema,
    confirmPassword: schemas.passwordSchema,
  })
  .required()
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    },
  );

type ValidationSchema = z.infer<typeof validationSchema>;

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
  });

  const { logOut } = useLogOut();
  const { isLoading, error, mutate } = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      logOut();
    },
  });

  const onSubmit = (formData: ValidationSchema) => {
    mutate(formData);
  };

  const errorMessage =
    error instanceof Error ? (
      <p className="text-red-500">{error.message}</p>
    ) : undefined;

  return (
    <form
      className="my-2 flex flex-col space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        path="oldPassword"
        type="password"
        name="Current Password"
        register={register}
        error={errors?.oldPassword?.message}
      />
      <FormField
        path="newPassword"
        type="password"
        name="New Password"
        register={register}
        error={errors?.newPassword?.message}
      />
      <FormField
        path="confirmPassword"
        type="password"
        name="Confirm New Password"
        register={register}
        error={errors?.confirmPassword?.message}
      />

      {errorMessage}
      <Button type="submit" disabled={isLoading} className="self-start">
        {isLoading ? 'Sending...' : 'CHANGE PASSWORD'}
      </Button>
    </form>
  );
};
