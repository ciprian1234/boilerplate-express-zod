import { Router } from 'express';
import { generateOpenApiSpecs } from '../swagger';
const router = Router();
const swaggerUi = require('swagger-ui-express');
const redoc = require('redoc-express');

const specs = generateOpenApiSpecs();

router.get('/specs', async (req: any, res: any) => {
  res.json(specs);
});

router.use('/swagger-ui', swaggerUi.serve);
router.get('/swagger-ui', swaggerUi.setup(specs));

router.get(
  '/redoc-ui',
  redoc({
    title: 'API Docs',
    specUrl: '/example2/api-docs/specs',
  }),
);

export default router;
