const express = require('express');

const db = require('./models/index.js');

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.listen(3065, () => {
  console.log('3065에서 서버 실행중');
});
