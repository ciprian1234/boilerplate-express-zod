import { Router } from 'express';
import { validate } from '../../../middlewares/validate';
import * as specs from '../swagger/specs/Article.spec';
const router = Router();

router.get('/:id', validate(specs.validation.getById), async (req: any, res: any) => {
  // if we reach here, the api input data is validated

  // << THE LOGIC FOR EXECUTING THE REQUEST >>

  res.json({ id: req.params.id });
});

router.post('/', validate(specs.validation.create), async (req: any, res: any) => {
  // if we reach here, the api input data is validated

  // << THE LOGIC FOR EXECUTING THE REQUEST >>

  res.json({ ...req.body });
});

export default router;
