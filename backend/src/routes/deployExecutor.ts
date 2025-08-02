import { Router } from 'express';

const router = Router();

router.post('/', (_req, res) => {
  // placeholder for deploying executor
  res.json({ status: 'executor deployed' });
});

export default router;
