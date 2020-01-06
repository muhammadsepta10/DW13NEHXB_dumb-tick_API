"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
    "favorite",
    {
      user: DataTypes.INTEGER,
      event: DataTypes.INTEGER
    },
    {}
  );
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.user, {
      foreignKey: "user",
      as: "User"
    }),
      favorite.belongsTo(models.events, {
        foreignKey: "event",
        as: "Event"
      });
  };
  return favorite;
};
