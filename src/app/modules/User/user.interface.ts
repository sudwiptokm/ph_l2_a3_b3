/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  //   isUserExist(userId: string): Promise<TUser>;
  isUserExistByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  //instance methods for checking if the jwt is issued before password changed
  //   isJWTIssuedBeforePasswordChanged(
  //     passwordChangedTimestamp: Date,
  //     jwtIssuedTimestamp: number,
  //   ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
