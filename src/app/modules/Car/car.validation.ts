import { z } from 'zod';

const CarValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).min(1).max(50),
  description: z
    .string({ required_error: 'Description is required.' })
    .min(1)
    .max(500),
  color: z.string({ required_error: 'Color is required.' }).min(1).max(50),
  isElectric: z.boolean({ required_error: 'Electric status is required.' }),
  status: z.enum(['available', 'unavailable']).default('available'),
  features: z
    .array(z.string({ required_error: 'Features is required.' }))
    .min(1),
  pricePerHour: z.number({ required_error: 'Price per hour is required.' }),
  isDeleted: z.boolean().default(false),
});

const CarUpdateValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(1)
    .max(50)
    .optional(),
  description: z
    .string({ required_error: 'Description is required.' })
    .min(1)
    .max(500)
    .optional(),
  color: z
    .string({ required_error: 'Color is required.' })
    .min(1)
    .max(50)
    .optional(),
  isElectric: z
    .boolean({ required_error: 'Electric status is required.' })
    .optional(),
  status: z.enum(['available', 'unavailable']).default('available').optional(),
  features: z
    .array(z.string({ required_error: 'Features is required.' }))
    .min(1)
    .optional(),
  pricePerHour: z
    .number({ required_error: 'Price per hour is required.' })
    .optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const CarValidation = {
  CarValidationSchema,
  CarUpdateValidationSchema,
};
