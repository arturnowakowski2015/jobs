import { z } from 'zod';

const firstNameSchema = z
  .string()
  .min(3, { message: 'Name must have at least 3 characters' })
  .max(15, { message: 'Name must be no longer than 15 characters' });

const lastNameSchema = z
  .string()
  .min(3, { message: 'Last name must have at least 3 characters' })
  .max(15, { message: 'Last name must be no longer than 15 characters' });

const passwordSchema = z
  .string()
  .min(5, { message: 'Password must have at least 5 characters' })
  .max(15, { message: 'Password must be no longer than 15 characters' });

export const schemas = {
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
};
