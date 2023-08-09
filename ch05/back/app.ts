import express, { Request, Response } from 'express';
import postRouter from './routes/post';
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello express');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello api');
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
