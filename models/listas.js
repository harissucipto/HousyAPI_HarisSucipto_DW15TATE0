"use strict";
module.exports = (sequelize, DataTypes) => {
  const ListAs = sequelize.define(
    "ListAs",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  ListAs.associate = function (models) {
    // associations can be defined here
    ListAs.hasMany(models.User, {
      foreignKey: "listAsId",
    });
  };
  return ListAs;
};
