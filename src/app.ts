/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, Request, Response } from 'express';

import cors from 'cors';

// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api', router);

// Entry point
const initialController = (req: Request, res: Response) => {
  const message: string =
    'Welcome to the Express Mongo TypeScript Boilerplate created by SudwiptoKM!';
  res.send(message);
};

app.get('/', initialController);

// app.use(globalErrorHandler);

// Not Found
// app.use(notFound);

export default app;
