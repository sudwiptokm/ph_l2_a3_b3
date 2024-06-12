import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.UserValidationSchema),
  AuthController.createUser,
);

router.post(
  '/signin',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.signIn,
);

export const AuthRoutes = router;
