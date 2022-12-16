export abstract class CustomError extends Error {
  abstract statusCode: number;
  details: any;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // abstract serializeErrors(): { message: string; field?: string }[];
  serializeErrors() {
    return { statusCode: this.statusCode, error: 'Generic Error', details: 'Base abstract class for custom errors' };
  }
}
