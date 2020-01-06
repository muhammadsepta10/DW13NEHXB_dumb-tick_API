"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      event: DataTypes.INTEGER,
      customer: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING
    },
    {}
  );
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.events, {
      foreignKey: "event",
      as: "Event"
    }),
      order.belongsTo(models.user, {
        foreignKey: "customer",
        as: "User"
      });
  };
  return order;
};
