/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import PasswordError from '../errors/PasswordError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage = 'An error occurred!';

  let modifiedError = err;

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (
    err?.errors &&
    err?.errors[Object.keys(err?.errors)[0]]?.name === 'CastError'
  ) {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    modifiedError = modifiedError?.errors[Object.keys(err.errors)[0]];
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessage = err.message;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessage = err.message;
  }

  // Unauthorized Error return
  if (err?.statusCode === httpStatus.UNAUTHORIZED) {
    return res.status(err.statusCode).json({
      success: false,
      message: 'You have no access to this route',
      statusCode: err.statusCode,
    });
  }

  // Password Error return
  if (err instanceof PasswordError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      data: null,
    });
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages: modifiedError,
    stack: config.NODE_ENV === 'DEVELOPMENT' ? err?.stack : null,
  });
};

export default globalErrorHandler;
