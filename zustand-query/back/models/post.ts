import Sequelize, {
  Model,
  CreationOptional,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyAddAssociationMixin,
  ForeignKey,
} from 'sequelize';

import User from './user';
import Comment from './comment';
import Image from './image';
import Hashtag from './hashtag';

class Post extends Model {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare UserId: ForeignKey<User['id']>;
  declare Retweet: CreationOptional<Post>;
  declare RetweetId: CreationOptional<number> | null;

  declare addLikers: BelongsToManyAddAssociationMixin<User, number>;
  declare removeLikers: BelongsToManyRemoveAssociationMixin<User, number>;

  declare content: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
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
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    Post.hasMany(Comment);
    Post.hasMany(Image);
    Post.belongsTo(User);
    Post.belongsTo(Post, { as: 'Retweet' });
    Post.belongsToMany(Hashtag, { through: 'PostHashtag' });
    Post.belongsToMany(User, { through: 'Like', as: 'Likers' });
  }
}

export default Post;
