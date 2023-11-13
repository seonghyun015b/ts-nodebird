import Sequelize, { CreationOptional, Model } from 'sequelize';

import Post from './post';

class Hashtag extends Model {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare name: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Hashtag.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: 'Hashtag',
        tableName: 'hashtags',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    Hashtag.belongsToMany(Post, { through: 'PostHashtag' });
  }
}

export default Hashtag;
