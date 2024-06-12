import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }).min(1).max(50),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1)
    .max(50),
});

export const AuthValidation = {
  loginValidationSchema,
};
