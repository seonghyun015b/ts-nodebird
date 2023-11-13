import Sequelize, { CreationOptional, Model } from 'sequelize';

import User from './user';
import Post from './post';

class Comment extends Model {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare content: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Comment.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    Comment.belongsTo(User);
    Comment.belongsTo(Post);
  }
}

export default Comment;
