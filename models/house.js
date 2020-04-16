"use strict";
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    "House",
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: DataTypes.STRING,
      ameneties: DataTypes.STRING,
      bedRoom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
    },
    {}
  );
  House.associate = function (models) {
    // associations can be defined here
    House.hasOne([models.City]);
    House.hasOne(models.User);
    House.belongsTo(models.Trx);
  };
  return House;
};
