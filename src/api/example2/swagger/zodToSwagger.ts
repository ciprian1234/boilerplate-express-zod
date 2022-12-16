import { OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// extend zod library with open api features
extendZodWithOpenApi(z);

// create swagger registry
const registry = new OpenAPIRegistry();

export { z, registry };
