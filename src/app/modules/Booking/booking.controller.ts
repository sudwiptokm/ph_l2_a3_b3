import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { Car } from '../Car/car.model';
import { BookingFilters, BookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  let bookingData = req.body;

  const isCarExist = await Car.isCarExist(bookingData.carId);
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  if (isCarExist.status !== 'available') {
    throw new AppError(httpStatus.BAD_REQUEST, 'This car is not available');
  }

  // Update car status to unavailable
  const updated_car = await Car.findByIdAndUpdate(
    { _id: bookingData.carId },
    { status: 'unavailable' },
    {
      new: true,
    },
  );

  bookingData = {
    ...bookingData,
    user: req.user._id,
    endTime: null,
    totalCost: 0,
    isBooked: 'confirmed',
    car: updated_car,
  };

  const result = await BookingService.createBookingIntoDB(bookingData);

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
    message: 'Car booked successfully',
    statusCode: httpStatus.OK,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date, isBooked } = req.query;

  const filters: BookingFilters = {
    ...(carId && { car: carId as string }),
    ...(date && { date: new Date(date as string) }),
    ...(isBooked && { isBooked: isBooked as 'confirmed' | 'unconfirmed' }),
  };

  const result = await BookingService.getAllBookingsFromDB(filters);

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
    message: 'Bookings retrieved successfully',
    statusCode: httpStatus.OK,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const result = await BookingService.getUserBookingsFromDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
    message: 'My Bookings retrieved successfully',
    statusCode: httpStatus.OK,
  });
});

const returnCarAndUpdateBooking = catchAsync(async (req, res) => {
  const result = await BookingService.returnCarAndUpdateBookingInDB(
    req.body.bookingId,
    req.body.endTime,
  );

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
    message: 'Car returned successfully',
    statusCode: httpStatus.OK,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBooking,
  returnCarAndUpdateBooking,
};
