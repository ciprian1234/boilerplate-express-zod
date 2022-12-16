export const allowedValidationDataLocations = ['params', 'query', 'body', 'headers'];

// return an express middleware for validating request data locations against zod schemas
export function validate(zodValidationSchemas: any) {
  return function (req: any, res: any, next: any) {
    if (!zodValidationSchemas) throw new Error('Invalid validation schemas');
    // check for each location and also (todo) if they are valid zod objects
    for (const [key, schema] of Object.entries(zodValidationSchemas)) {
      if (!allowedValidationDataLocations.includes(key)) throw new Error(`Invalid validation data location: ${key}`);

      const dataLocation = key;
      const result = (<any>schema).parse(req[dataLocation]); // throws zod error if validation failed
      req[key] = result; // replace with casted values
    }
    next();
  };
}
