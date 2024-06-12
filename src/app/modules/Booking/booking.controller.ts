import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Car } from '../Car/car.model';
import { BookingService } from './booking.service';
import { BookingFilters } from './booking.utils';

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
  const { carId, date } = req.query;

  const filters: BookingFilters = {
    ...(carId && { car: carId as string }),
    ...(date && { date: new Date(date as string) }),
  };

  const result = await BookingService.getAllBookingsFromDB(filters);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: result,
    });
  }
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
