"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "listAs",
      [
        {
          name: "owner",
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "tenant",
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("listAs", null, {});
  },
};
