import Sequelize, {
  Model,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import Post from './post';
import Comment from './comment';

class User extends Model {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare addFollowings: BelongsToManyAddAssociationMixin<User, number>;
  declare removeFollowers: BelongsToManyAddAssociationMixin<User, number>;

  declare addFollowers: BelongsToManyAddAssociationMixin<User, number>;
  declare removeFollowings: BelongsToManyAddAssociationMixin<User, number>;

  declare getFollowings: BelongsToManyGetAssociationsMixin<User>;
  declare getFollowers: BelongsToManyGetAssociationsMixin<User>;

  declare email: string;
  declare nickname: string;
  declare password: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate() {
    User.hasMany(Post);
    User.hasMany(Comment);
    User.belongsToMany(Post, { through: 'Like', as: 'Liked' });
    User.belongsToMany(User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
    User.belongsToMany(User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
  }
}

export default User;
