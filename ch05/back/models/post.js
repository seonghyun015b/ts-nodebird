module.exports = (sequelize, DataType) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataType.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Post.associate = (db) => {};
  return Post;
};
