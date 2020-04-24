"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      listAsId: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.ListAs, {
      foreignKey: "listAsId",
    });
    User.hasMany(models.House, {
      foreignKey: "ownerId",
    });
    User.hasOne(models.Trx, {
      foreignKey: "tenantId",
    });
  };
  return User;
};
