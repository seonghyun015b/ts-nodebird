import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.json([
    { id: 1, content: 'Hello' },
    { id: 2, content: 'Hello' },
    { id: 3, content: 'Hello' },
  ]);
});

router.delete('/', (req: Request, res: Response) => {
  res.json([{ id: 1 }, { id: 2 }]);
});

export default router;
