import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.registerUserIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await AuthService.signInUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result.user,
    token: result.token!,
  });
});

export const AuthController = {
  createUser,
  signIn,
};
