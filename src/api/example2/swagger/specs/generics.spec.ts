import { z, registry } from '../zodToSwagger';

export const paginationQueryParams = {
  page: z.preprocess((n: any) => (n ? parseInt(n) : 1), z.number().openapi({ default: 1, description: 'Page number' })),
  limit: z.preprocess((n: any) => (n ? parseInt(n) : 10), z.number().openapi({ default: 10, description: 'Page limit' })),
};

export const schemaPager = z.object({
  totalPages: z.number().int(),
  currentPage: z.number().int(),
  itemsCount: z.number().int(),
});

export const schemaError = z.object({
  statusCode: z.number().int(),
  error: z.string(),
  details: z.any().openapi({ type: ['object'] }),
});

export type Pager = z.infer<typeof schemaPager>;
export type Error = z.infer<typeof schemaError>;

export class PaginatedResultDTO<T> {
  public pager!: Pager;
  public results!: T[];
}

// register components
registry.register('Error', schemaError);
