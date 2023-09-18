const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'ts-tool',
    password: process.env.DB_PASSWORD,
    database: 'ts-tool-db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'ts-tool',
    password: process.env.DB_PASSWORD,
    database: 'ts-tool-db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'ts-tool',
    password: process.env.DB_PASSWORD,
    database: 'ts-tool-db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
