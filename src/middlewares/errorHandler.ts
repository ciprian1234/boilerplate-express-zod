import { CustomError } from '../errors/customError';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: any, res: any, next: any) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  } else if (err instanceof ZodError) {
    return res.status(400).send({ statusCode: 400, error: 'Validation Error', details: err.issues });
  }
  console.error(err.message, err.stack);
  res.status(500).send({ errors: [{ message: 'Something went wrong!' }] });
}
