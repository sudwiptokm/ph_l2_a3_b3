import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Car } from '../Car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { BookingFilters, convertTimeToHours } from './booking.utils';

const createBookingIntoDB = async (bookingData: TBooking) => {
  const result = (await Booking.create(bookingData)).populate('user');
  return result;
};

const getAllBookingsFromDB = async (filters: BookingFilters) => {
  const result = await Booking.find(filters).populate('user').populate('car');
  return result;
};

const getUserBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId })
    .populate('user')
    .populate('car');
  return result;
};

const returnCarAndUpdateBookingInDB = async (
  bookingId: string,
  endTime: string,
) => {
  const booking = await Booking.findById({ _id: bookingId });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  const car = await Car.findById(booking.car);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const startHour = convertTimeToHours(booking.startTime);
  const endHour = convertTimeToHours(endTime);

  // Calculate duration
  const duration = endHour - startHour;
  if (duration <= 0) {
    throw new Error('End time must be after start time');
  }

  // Calculate total cost
  const totalCost = duration * car.pricePerHour;

  await Car.findByIdAndUpdate(
    { _id: car._id },
    { status: 'available' },
    { new: true },
  );

  const result = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { endTime: endTime, totalCost: totalCost },
    { new: true },
  );
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  returnCarAndUpdateBookingInDB,
};
