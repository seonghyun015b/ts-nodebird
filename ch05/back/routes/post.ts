import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.json([
    { id: 1, content: 'post1' },
    { id: 2, content: 'post2' },
    { id: 3, content: 'post3' },
  ]);
});

router.delete('/', (req: Request, res: Response) => {
  res.json([
    { id: 1, content: 'post delete1' },
    { id: 2, content: 'post delete2' },
    { id: 3, content: 'post delete3' },
  ]);
});

export default router;
