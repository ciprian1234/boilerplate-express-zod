import 'express-async-errors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import example1 from './api/example1/routes';
import example2 from './api/example2/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript + Zod Server');
});

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/example1', example1);
app.use('/example2', example2);

// handle not found routes
app.all('*', (req, res) => {
  throw new NotFoundError('Path not found');
});

// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
