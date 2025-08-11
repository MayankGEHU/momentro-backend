module.exports = (sequelize, DataTypes) => {
  const UserFavPic = sequelize.define("UserFavPic", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UserFavPic.associate = (models) => {
    UserFavPic.belongsTo(models.User, { foreignKey: "userId" });
  };

  return UserFavPic;
};
