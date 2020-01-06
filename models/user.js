"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      img: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.events, {
      foreignKey: "createdBy"
    }),
      user.hasMany(models.order, {
        foreignKey: "customer"
      });
    user.hasMany(models.favorite, {
      foreignKey: "user"
    });
  };
  return user;
};
