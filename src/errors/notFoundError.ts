import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(details: any) {
    super('Not Found');
    this.details = details;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, error: this.message, details: this.details };
  }
}
