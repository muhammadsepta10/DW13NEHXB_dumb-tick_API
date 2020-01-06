"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define("events", {
    name: DataTypes.STRING,
    category: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    descrption: DataTypes.TEXT,
    addres: DataTypes.STRING,
    urlMaps: DataTypes.STRING,
    img: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  });
  events.associate = function(models) {
    events.belongsTo(models.category, {
      foreignKey: "category",
      as: "Category"
    }),
      events.belongsTo(models.user, {
        foreignKey: "createdBy",
        as: "User"
      }),
      events.hasMany(models.order, {
        foreignKey: "event"
      });
    events.hasMany(models.favorite, {
      foreignKey: "event"
    });
  };
  return events;
};
