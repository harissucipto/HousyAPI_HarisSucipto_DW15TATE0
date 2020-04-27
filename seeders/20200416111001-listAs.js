"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "ListAs",
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

  down: (queryInterface) => {
    return queryInterface.bulkDelete("ListAs", null, {});
  },
};
