import Sequelize from 'sequelize';
import configObj from '../config/config';

import User from './user';
import Post from './post';
import Comment from './comment';
import Image from './image';
import Hashtag from './hashtag';

const env = (process.env.NODE_ENV as 'production' | 'test') || 'development';
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);
Post.initiate(sequelize);
Comment.initiate(sequelize);
Image.initiate(sequelize);
Hashtag.initiate(sequelize);

User.associate();
Post.associate();
Comment.associate();
Image.associate();
Hashtag.associate();
