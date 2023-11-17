import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink, useNavigate } from 'react-router-dom';

import { schemas } from 'constants/schemas';
import { routes } from 'router/routes';
import { authService } from 'services/authService';
import { FormField } from 'components/form';
import { Button } from 'components/buttons';

const validationSchema = z
  .object({
    email: z.string().email({ message: 'Incorrect email format' }),
    password: schemas.passwordSchema,
    rememberMe: z.boolean(),
  })
  .required();
type ValidationSchema = z.infer<typeof validationSchema>;

export const SignInForm = () => {
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
    mutationFn: authService.login,
    onSuccess: () => {
      navigate(routes.dashboard);
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
      className="my-10 flex flex-col space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <label htmlFor="rememberMe" className="cursor-pointer">
        <input
          id="rememberMe"
          type="checkbox"
          {...register('rememberMe')}
          className="mr-3"
        />
        Remember me
      </label>
      {errorMessage}
      <Button type="submit" disabled={isLoading} className="self-start">
        {isLoading ? 'Logging...' : 'SIGN IN'}
      </Button>
    </form>
  );
};

export const Signin = () => {
  return (
    <>
      <h1 className="mb-6 mt-2 text-5xl sm:text-6xl">Sign In</h1>
      <SignInForm />
      <div>login:john.doe@example.com</div>
      <div>password:example</div>
      <br />
      <p>
        {`Don't have an account?`}
        {'   '}
        <NavLink
          to={routes.signup}
          className="cursor-pointer text-blue-700 underline"
        >
          Click here to create one
        </NavLink>
      </p>
    </>
  );
};
