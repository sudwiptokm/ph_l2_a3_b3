import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  console.log(err);
  const errorMessages = err.issues.map((issue) => {
    const field = issue.path[0];
    const message = `${field} is ${issue.message.toLowerCase()}`;
    return message;
  });

  const errorMessageString = errorMessages.join('. ') + '.';

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorMessageString,
  };
};

export default handleZodError;
