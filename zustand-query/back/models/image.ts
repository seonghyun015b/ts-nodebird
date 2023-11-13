import Sequelize, { CreationOptional, Model } from 'sequelize';
import Post from './post';

class Image extends Model {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare src: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Image.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        src: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: 'Image',
        tableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate() {
    Image.belongsTo(Post);
  }
}

export default Image;
