import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (car: TCar) => {
  const result = await Car.create(car);
  return result;
};

const getCarsFromDB = async () => {
  const result = await Car.find();
  return result;
};

const getCarByIdFromDB = async (carId: string) => {
  const isCarExist = await Car.isCarExist(carId);
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findById({ _id: carId });
  return result;
};

const updateCarByIdFromDB = async (carId: string, car: Partial<TCar>) => {
  const isCarExist = await Car.isCarExist(carId);
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findByIdAndUpdate({ _id: carId }, car, {
    new: true,
  });

  return result;
};

const deleteCarByIdFromDB = async (carId: string) => {
  const isCarExist = await Car.isCarExist(carId);
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findByIdAndUpdate(
    { _id: carId },
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

export const CarService = {
  createCarIntoDB,
  getCarsFromDB,
  getCarByIdFromDB,
  updateCarByIdFromDB,
  deleteCarByIdFromDB,
};
