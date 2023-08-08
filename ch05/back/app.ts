import express, { Request, Response } from 'express';
import postRouter from './routes/post';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello express');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('hello api');
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('3065에서 서버 실행중:');
});
