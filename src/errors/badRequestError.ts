import { CustomError } from './customError';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(details: any) {
    super('Bad request');
    this.details = details;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, error: this.message, details: this.details };
  }
}
