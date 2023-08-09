import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello express');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello api');
});

app.get('/api/posts', (req: Request, res: Response) => {
  res.json([
    { id: 1, content: 'Hello1' },
    { id: 2, content: 'Hello2' },
    { id: 3, content: 'Hello3' },
  ]);
});

app.post('/post', (req: Request, res: Response) => {
  res.json([
    { id: 1, content: 'post1' },
    { id: 2, content: 'post2' },
    { id: 3, content: 'post3' },
  ]);
});

app.delete('/delete', (req: Request, res: Response) => {
  res.json([
    { id: 1, content: 'delete1' },
    { id: 2, content: 'delete2' },
    { id: 3, content: 'delete3' },
  ]);
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
