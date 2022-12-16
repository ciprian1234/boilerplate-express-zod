import { z, registry } from '../zodToSwagger';
import * as r from '../registerPaths';
import { paginationQueryParams, schemaPager } from './generics.spec';

//
//
//
//
// 1. Zod Schema definitions for api input validation and definition of entitites
// - api validation input schemas
export const validation = {
  getById: {
    params: z.object({ id: z.string().uuid() }),
  },
  getWithPagination: {
    query: z.object({
      search: z.string().min(1).optional(),
      ...paginationQueryParams,
    }),
  },
  create: {
    body: z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      birthDate: z.date().optional(),
    }),
  },
  update: {
    params: z.object({ id: z.string().uuid() }),
    body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      birthDate: z.date().optional(),
    }),
  },
  deleteById: {
    params: z.object({ id: z.string().uuid() }),
  },
};

// - api output schemas
export const schemaUser = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date().optional(),
});

export const schemaUserPaginatedResult = z.object({ pager: schemaPager, results: z.array(schemaUser) });

//
//
//
//
// 2. Infer typescript interfaces from zod schemas
// - api input interfaces
export type UserCreateDTO = z.infer<typeof validation.create.body>;
export type UserUpdateDTO = z.infer<typeof validation.update.body>;
// - api output interfaces
export type UserDTO = z.infer<typeof schemaUser>;

//
//
//
//
// 3. Register open api elements (components, paths)
// Register swagger components:
// - api inputs
registry.register('UserCreateInput', validation.create.body);
registry.register('UserUpdateInput', validation.update.body);

// - api responses
registry.register('User', schemaUser);
registry.register('UserPaginatedResult', schemaUserPaginatedResult);

// Register swagger paths
const entityName = 'User';
const basePath = '/users';
r.registerGetByIdPath({ basePath, entityName, validation: validation.getById });
r.registerGetWithPaginationPath({ basePath, entityName, validation: validation.getWithPagination });
r.registerCreatePath({ basePath, entityName, validation: validation.create });
r.registerFullUpdatePath({ basePath, entityName, validation: validation.update });
r.registerDeletePath({ basePath, entityName, validation: validation.deleteById });
