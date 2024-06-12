import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const registerUserIntoDb = async (payload: TUser) => {
  // checking if the user is exist
  const user = await User.isUserExistByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'This user is already exist !');
  }

  //register user
  const newUser = await User.create(payload);
  return newUser;
};

const signInUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client
  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    user: user,
    token: accessToken,
  };
};

export const AuthService = {
  registerUserIntoDb,
  signInUser,
};
