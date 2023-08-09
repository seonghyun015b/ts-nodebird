module.exports = (sequelize, DataType) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: DataType.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Hashtag.associate = (db) => {};
  return Hashtag;
};
