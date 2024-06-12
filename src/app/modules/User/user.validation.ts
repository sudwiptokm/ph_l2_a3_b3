import { z } from 'zod';

const UserValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).min(1).max(50),
  email: z.string({ required_error: 'Email is required.' }).min(1).max(50),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1)
    .max(50),
  role: z.enum(['user', 'admin'], { required_error: 'Role is required.' }),
  phone: z.string({ required_error: 'Phone is required.' }).min(1).max(50),
  address: z.string({ required_error: 'Address is required.' }).min(1).max(50),
});

export const UserValidation = {
  UserValidationSchema,
};
