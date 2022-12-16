import { Router, Request, Response } from 'express';
import z from 'zod';
import { validate } from '../../../middlewares/validate';
const router = Router();

// api input validation validation
export const validation = {
  get: {
    params: z.object({ id: z.string().uuid() }),
    query: z.object({ queryParam1: z.string().min(1).optional(), queryParam2: z.string().max(5).optional() }),
  },

  create: {
    body: z.object({
      field1: z.string(),
      field2: z.string().nullable(),
      field3: z.string().nullable().optional(),
    }),
  },
};

// infer types from validation
type GetInputPathParams = z.infer<typeof validation.get.params>;
type GetInputQueryParams = z.infer<typeof validation.get.query>;
type CreateInputBody = z.infer<typeof validation.create.body>;

router.get('/:id', validate(validation.get), (req: Request<GetInputPathParams, any, any, GetInputQueryParams>, res: Response) => {
  // if we reach here, the api input data is validated

  // TODO: demo typescript req.params and req.query

  // << THE LOGIC FOR EXECUTING THE REQUEST >>

  res.json({ id: req.params.id, ...req.query });
});

// infer types from
router.post('/', validate(validation.create), async (req: Request<any, any, CreateInputBody, any>, res: Response) => {
  // if we reach here, the api input data is validated

  // TODO: demo typescript req.body

  // << THE LOGIC FOR EXECUTING THE REQUEST >>

  res.json({ ...req.body });
});

export default router;
