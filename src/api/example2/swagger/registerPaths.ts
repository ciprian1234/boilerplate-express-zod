import { z, registry } from './zodToSwagger';

const acceptLanguageParam = registry.registerParameter(
  'Accept-Language',
  z.ostring().openapi({
    param: {
      in: 'header',
      name: 'Accept-Language',
      required: false,
      description: 'If not provided the default value will be: <b>en</b>',
    },
  }),
);

const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

//common errors types
export const schemaError400 = z.object({
  statusCode: z.number().int().openapi({ example: 400 }),
  error: z.string().openapi({ example: 'ValidationError' }),
  details: z.any().openapi({
    type: ['array'],
    example: ['Validation error details...'],
  }),
});

export const schemaError401 = z.object({
  statusCode: z.number().int().openapi({ example: 401 }),
  error: z.string().openapi({ example: 'Unauthorized' }),
  details: z.any().openapi({
    type: ['string'],
    example: 'Missing accessToken',
  }),
});

export const schemaError403 = z.object({
  statusCode: z.number().int().openapi({ example: 403 }),
  error: z.string().openapi({ example: 'Forbidden' }),
  details: z.any().openapi({
    type: ['string'],
    example: 'Permission denied',
  }),
});

export const schemaError404 = z.object({
  statusCode: z.number().int().openapi({ example: 404 }),
  error: z.string().openapi({ example: 'Not found' }),
  details: z.any().openapi({
    type: ['string'],
    example: 'Item not found',
  }),
});

export const schemaError500 = z.object({
  statusCode: z.number().int().openapi({ example: 500 }),
  error: z.string().openapi({ example: 'Internal Server Error' }),
  details: z.any().openapi({
    type: ['string'],
    example: 'Internal Server Error details...',
  }),
});

const commonResponse400 = { description: `Bad request`, content: { 'application/json': { schema: schemaError400 } } };
const commonResponse401 = { description: `Unauthorized`, content: { 'application/json': { schema: schemaError401 } } };
const commonResponse403 = { description: `Forbidden`, content: { 'application/json': { schema: schemaError403 } } };
const commonResponse404 = { description: `Not found`, content: { 'application/json': { schema: schemaError404 } } };
const commonResponse500 = { description: `Internal Server Error`, content: { 'application/json': { schema: schemaError500 } } };

/**
 *
 */
export function registerGetByIdPath(input: any) {
  registry.registerPath({
    method: 'get',
    path: `${input.basePath}/{id}`,
    //security: [{ [bearerAuth.name]: [] }],
    tags: [input.entityName],
    summary: `Get a ${input.entityName}`,
    description: `Get the details of a single instance of a \`${input.entityName}\` by id.`,
    request: {
      headers: [acceptLanguageParam],
      params: input.validation.params,
    },
    responses: {
      200: {
        description: `Result`,
        content: { 'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}` } } },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 *
 */
export function registerGetAllPath(input: any) {
  registry.registerPath({
    method: 'get',
    path: input.basePath,
    tags: [input.entityName],
    summary: `Get ${input.entityName} items`,
    description: `Get all ${input.entityName} items without pagination`,
    request: {
      headers: [acceptLanguageParam],
      params: input.validation.param,
      query: input.validation.query,
    },
    responses: {
      200: {
        description: 'List of items',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}ArrayResult` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 *
 */
export function registerGetWithPaginationPath(input: any) {
  registry.registerPath({
    method: 'get',
    path: input.basePath,
    tags: [input.entityName],
    summary: `Get ${input.entityName} items`,
    description: `Get ${input.entityName} items with pagination`,
    request: {
      headers: [acceptLanguageParam],
      params: input.validation.param,
      query: input.validation.query,
    },
    responses: {
      200: {
        description: 'Result with pagination',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}PaginatedResult` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 *
 */
export function registerCreatePath(input: any) {
  registry.registerPath({
    method: 'post',
    path: input.basePath,
    tags: [input.entityName],
    summary: `Create a ${input.entityName}`,
    description: `Create a ${input.entityName} item.`,
    request: {
      body: { content: { 'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}CreateInput` } } } },
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      500: commonResponse500,
    },
  });
}

/**
 *
 */
export function registerFullUpdatePath(input: any) {
  registry.registerPath({
    method: 'put',
    path: `${input.basePath}/{id}`,
    tags: [input.entityName],
    summary: `Full update of a ${input.entityName}`,
    description: `Full update of a ${input.entityName} item by id.`,
    request: {
      params: input.validation.params,
      body: { content: { 'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}UpdateInput` } } } },
    },
    responses: {
      200: {
        description: 'Updated',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 *
 */
export function registerPartialUpdatePath(input: any) {
  registry.registerPath({
    method: 'patch',
    path: `${input.basePath}/{id}`,
    tags: [input.entityName],
    summary: `Partial update of a ${input.entityName}`,
    description: `Partial update of a ${input.entityName} item by id.`,
    request: {
      params: input.validation.params,
      body: { content: { 'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}UpdateInput` } } } },
    },
    responses: {
      200: {
        description: 'Updated',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 * Register delete item by id API path
 */
export function registerDeletePath(input: any) {
  registry.registerPath({
    method: 'delete',
    path: `${input.basePath}/{id}`,
    tags: [input.entityName],
    summary: `Delete a ${input.entityName}`,
    description: `Delete a ${input.entityName} item by id`,
    request: {
      params: input.validation.params,
    },
    responses: {
      204: {
        description: 'Updated',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.entityName}` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 * Register api path related entities
 */
export function registerGetRelatedEntitiesPath(input: any) {
  registry.registerPath({
    method: 'get',
    path: input.path,
    tags: [input.entityName],
    summary: `Get related ${input.relatedEntityName} items`,
    description: `Get related ${input.relatedEntityName} items by ${input.entityName}Id.`,
    request: {
      headers: [acceptLanguageParam],
      params: input.validation.params,
      query: input.validation.query,
    },
    responses: {
      200: {
        description: 'Result',
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${input.relatedEntityName}` } },
        },
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 * Register api path which adds a link to a related entity
 */
export function registerAddLinkToRelatedEntity(input: any) {
  registry.registerPath({
    method: 'post',
    path: input.path,
    tags: [input.entityName],
    summary: `Add link to a ${input.relatedEntityName}`,
    description: `Add link to a ${input.relatedEntityName}`,
    request: {
      params: input.validation.params,
      query: input.validation.query,
    },
    responses: {
      204: {
        description: 'Succesfull result',
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}

/**
 * Register api path which adds a link to a related entity
 */
export function registerRemoveLinkToRelatedEntity(input: any) {
  registry.registerPath({
    method: 'delete',
    path: input.path,
    tags: [input.entityName],
    summary: `Remove link to a linked ${input.relatedEntityName}`,
    description: `Remove link to a linked ${input.relatedEntityName}`,
    request: {
      params: input.validation.params,
      query: input.validation.query,
    },
    responses: {
      204: {
        description: 'Succesfull result',
      },
      400: commonResponse400,
      401: commonResponse401,
      403: commonResponse403,
      404: commonResponse404,
      500: commonResponse500,
    },
  });
}
