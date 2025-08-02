import { Router } from 'express';

const router = Router();

router.get('/:name', (req, res) => {
  const { name } = req.params;
  // placeholder to fetch ABI by name
  res.json({ abi: name });
});

export default router;
