"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trx = sequelize.define(
    "Trx",
    {
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      houseId: DataTypes.INTEGER,
      tenantId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {}
  );
  Trx.associate = function (models) {
    // associations can be defined here
    Trx.belongsTo(models.House);
    Trx.belongsTo(models.User, {
      foreignKey: "tenantId",
    });
  };
  return Trx;
};
