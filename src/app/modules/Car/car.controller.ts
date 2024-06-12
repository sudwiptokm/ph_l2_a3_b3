import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarService } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const result = await CarService.createCarIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});

const getCars = catchAsync(async (req, res) => {
  const result = await CarService.getCarsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

const getCarById = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarService.getCarByIdFromDB(carId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  });
});

const updateCarById = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarService.updateCarByIdFromDB(carId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCarById = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarService.deleteCarByIdFromDB(carId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car deleted successfully',
    data: result,
  });
});

export const CarController = {
  createCar,
  getCars,
  getCarById,
  updateCarById,
  deleteCarById,
};
