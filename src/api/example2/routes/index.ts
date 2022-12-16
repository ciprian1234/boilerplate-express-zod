import { Router } from 'express';
import apiDocsRouter from './api-docs';
import userRouter from './user.route';
import articleRouter from './article.route';
const router = Router();

router.use('/api-docs', apiDocsRouter);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

export default router;
