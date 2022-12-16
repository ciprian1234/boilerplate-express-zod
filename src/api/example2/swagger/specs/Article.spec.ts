import { z, registry } from '../zodToSwagger';
import * as r from '../registerPaths';
import { paginationQueryParams, schemaPager } from './generics.spec';
import { schemaUser } from './User.spec';

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
      title: z.string(),
      description: z.string(),
      visible: z.boolean().optional(),
    }),
  },
  update: {
    params: z.object({ id: z.string().uuid() }),
    body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      visible: z.boolean().optional(),
    }),
  },
  deleteById: {
    params: z.object({ id: z.string().uuid() }),
  },
};

// - api output schemas
export const schemaArticle = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  visible: z.boolean().optional(),
  author: schemaUser,
});

export const schemaArticleLink = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  visible: z.boolean().optional(),
});

export const schemaArticlePaginatedResult = z.object({ pager: schemaPager, results: z.array(schemaArticle) });

//
//
//
//
// 2. Infer typescript interfaces from zod schemas
// - api input interfaces
export type ArticleCreateDTO = z.infer<typeof validation.create.body>;
export type ArticleUpdateDTO = z.infer<typeof validation.update.body>;
// - api output interfaces
export type ArticleDTO = z.infer<typeof schemaArticle>;

//
//
//
//
// 3. Register open api elements (components, paths)
// Register swagger components:
// - api inputs
registry.register('ArticleCreateInput', validation.create.body);
registry.register('ArticleUpdateInput', validation.update.body);

// - api responses
registry.register('Article', schemaArticle);
registry.register('ArticlePaginatedResult', schemaArticlePaginatedResult);

// Register swagger paths
const entityName = 'Article';
const basePath = '/articles';
r.registerGetByIdPath({ basePath, entityName, validation: validation.getById });
r.registerGetWithPaginationPath({ basePath, entityName, validation: validation.getWithPagination });
r.registerCreatePath({ basePath, entityName, validation: validation.create });
r.registerFullUpdatePath({ basePath, entityName, validation: validation.update });
r.registerDeletePath({ basePath, entityName, validation: validation.deleteById });
