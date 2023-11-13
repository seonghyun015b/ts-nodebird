import express from 'express';
import path from 'path';
import { sequelize } from './models';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';

import userRouter from './routes/user';
import postsRouter from './routes/posts';
import postRouter from './routes/post';

// dotenv
dotenv.config();

const app = express();

// sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch((err) => console.error(err));

// cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// images
app.use('/', express.static(path.join(__dirname, 'uploads')));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
  })
);

// passport
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

//routers
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(3065, () => {
  console.log('3065 포트에서 서버 대기중');
});
