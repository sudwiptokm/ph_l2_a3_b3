import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.BookingCreateValidationSchema),
  BookingController.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingController.getAllBookings);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingController.getUserBooking,
);

router.put(
  '/return',
  auth(USER_ROLE.admin),
  validateRequest(BookingValidation.BookingReturnValidationSchema),
  BookingController.returnCarAndUpdateBooking,
);

export const BookingRouter = router;
