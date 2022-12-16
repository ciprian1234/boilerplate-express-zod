import { OpenAPIGenerator } from '@asteasolutions/zod-to-openapi';
import { registry } from './zodToSwagger';

import './specs/User.spec';
import './specs/Article.spec';

export function generateOpenApiSpecs() {
  const generator = new OpenAPIGenerator(registry.definitions, '3.0.3');
  const specs = generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'Example',
      description: 'Typescript interfaces + runtime validation + api documentation using zod',
    },
    servers: [{ url: 'http://localhost:9090/example2' }], // server url will be added at runtime clientside
  });
  return specs;
}
