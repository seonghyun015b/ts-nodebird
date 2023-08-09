module.exports = (sequelize, DataType) => {
  const Image = sequelize.define(
    'Image',
    {
      src: {
        type: DataType.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
