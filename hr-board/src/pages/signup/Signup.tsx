import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, NavLink } from 'react-router-dom';

import { schemas } from 'constants/schemas';
import { routes } from 'router/routes';
import { authService } from 'services/authService';
import { FormField } from 'components/form';
import { Button } from 'components/buttons';
import type { UserRegisterData } from 'services/authService';

const validationSchema = z
  .object({
    firstName: schemas.firstNameSchema,
    lastName: schemas.lastNameSchema,
    email: z.string().email({ message: 'Incorrect email format' }),
    password: schemas.passwordSchema,
    confirmPassword: schemas.passwordSchema,
  })
  .required()
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    },
  );

type ValidationSchema = z.infer<typeof validationSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
  });

  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate(routes.signin);
    },
  });

  const onSubmit = (formData: ValidationSchema) => {
    const userData: UserRegisterData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    mutate(userData);
  };

  const errorMessage =
    error instanceof Error ? (
      <p className="text-red-500">{error.message}</p>
    ) : undefined;

  return (
    <form
      className="my-10 flex flex-col space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        path="firstName"
        type="text"
        name="First name"
        register={register}
        error={errors?.firstName?.message}
      />
      <FormField
        path="lastName"
        type="text"
        name="Last name"
        register={register}
        error={errors?.lastName?.message}
      />
      <FormField
        path="email"
        type="email"
        name="E-mail"
        register={register}
        error={errors?.email?.message}
      />
      <FormField
        path="password"
        type="password"
        name="Password"
        register={register}
        error={errors?.password?.message}
      />
      <FormField
        path="confirmPassword"
        type="password"
        name="Confirm Password"
        register={register}
        error={errors?.confirmPassword?.message}
      />
      {errorMessage}
      <Button type="submit" disabled={isLoading} className="self-start">
        {isLoading ? 'Registering...' : 'SIGN UP'}
      </Button>
    </form>
  );
};

export const Signup = () => {
  return (
    <>
      <h1 className="mb-6 mt-2 text-5xl sm:text-6xl">Sign Up</h1>
      <SignUpForm />
      <p>
        Already have an account? Then{' '}
        <NavLink
          to={routes.signin}
          className="cursor-pointer text-blue-700 underline"
        >
          Sign In
        </NavLink>
      </p>
    </>
  );
};
