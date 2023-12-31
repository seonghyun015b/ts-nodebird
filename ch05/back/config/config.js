const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'ts-bird',
    password: process.env.DB_PASSWORD,
    database: 'ts-bird-database',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'ts-bird',
    password: process.env.DB_PASSWORD,
    database: 'ts-bird-database',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'ts-bird',
    password: process.env.DB_PASSWORD,
    database: 'ts-bird-database',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
