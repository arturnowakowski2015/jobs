import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemas } from 'constants/schemas';
import { userService } from 'services/userService';
import { FormField } from 'components/form';
import { Button } from 'components/buttons';
import { USER_ME_QUERY_KEY } from 'constants/constants';
import { useCurrentUser } from 'hooks/useCurrentUser';

const validationSchema = z
  .object({
    firstName: schemas.firstNameSchema,
    lastName: schemas.lastNameSchema,
  })
  .required();

type ValidationSchema = z.infer<typeof validationSchema>;

export const ChangeNameForm = () => {
  const { currentUser } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  });

  const queryClient = useQueryClient();

  const { isLoading, error, mutate } = useMutation({
    mutationFn: userService.updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries(USER_ME_QUERY_KEY);
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
        path="firstName"
        type="text"
        name="First Name"
        register={register}
        error={errors?.firstName?.message}
      />
      <FormField
        path="lastName"
        type="text"
        name="Last Name"
        register={register}
        error={errors?.lastName?.message}
      />

      {errorMessage}
      <Button type="submit" disabled={isLoading} className="self-start">
        {isLoading ? 'Sending...' : 'CHANGE NAME'}
      </Button>
    </form>
  );
};
