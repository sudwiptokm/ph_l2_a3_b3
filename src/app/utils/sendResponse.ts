import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  token?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // Create the response object
  const responseObject: TResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  };

  // Conditionally add the token if it exists
  if (data.token) {
    responseObject.token = data.token;
  }

  // Send the response
  res.status(data.statusCode).json(responseObject);
};

export default sendResponse;
