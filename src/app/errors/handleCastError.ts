import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessage = `${
    err.errors[Object.keys(err.errors)[0]]?.value ?? 'id'
  } is not a valid ID!`;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: errorMessage,
  };
};

export default handleCastError;
