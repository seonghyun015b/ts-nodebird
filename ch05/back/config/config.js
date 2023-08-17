const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'tsnode',
    password: process.env.DB_PASSWORD,
    database: 'tsnode-bird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'tsnode',
    password: process.env.DB_PASSWORD,
    database: 'tsnode-bird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'tsnode',
    password: process.env.DB_PASSWORD,
    database: 'tsnode-bird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
