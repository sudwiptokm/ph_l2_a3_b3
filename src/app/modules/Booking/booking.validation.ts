import { z } from 'zod';

const BookingCreateValidationSchema = z.object({
  carId: z.string({ required_error: 'Car ID is required.' }),
  date: z.string({ required_error: 'Date is required.' }),
  startTime: z.string({ required_error: 'Start date is required.' }),
});

const BookingReturnValidationSchema = z.object({
  bookingId: z.string({ required_error: 'Booking ID is required.' }),
  endTime: z.string({ required_error: 'End time is required.' }),
});

export const BookingValidation = {
  BookingCreateValidationSchema,
  BookingReturnValidationSchema,
};
