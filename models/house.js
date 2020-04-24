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
      ameneties: {
        type: DataTypes.STRING,
        set(value) {
          const data = Array.isArray(value)
            ? value.join(";")
            : null;
          this.setDataValue("ameneties", data);
        },
        get() {
          const data = this.getDataValue("ameneties");
          return String(data).split(";");
        },
      },
      bedRoom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
    },
    {}
  );
  House.associate = function (models) {
    // associations can be defined here
    House.belongsTo(models.City);
    House.belongsTo(models.User, {
      foreignKey: "ownerId",
    });
    House.hasMany(models.Trx);
  };
  return House;
};
