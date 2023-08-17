const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user');

const db = require('./models/index.js');
const passportConfig = require('./passport');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: true,
    // credentials: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('3065에서 서버 실행중');
});
