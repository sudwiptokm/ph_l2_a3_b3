import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { CarController } from './car.controller';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.CarValidationSchema),
  CarController.createCar,
);

router.get('/', CarController.getCars);

router.get('/:carId', CarController.getCarById);

router.put(
  '/:carId',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.CarUpdateValidationSchema),
  CarController.updateCarById,
);

router.delete('/:carId', auth(USER_ROLE.admin), CarController.deleteCarById);

export const CarRoutes = router;
