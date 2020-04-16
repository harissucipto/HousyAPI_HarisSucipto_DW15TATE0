"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          fullName: "Haris Sucipto",
          username: "harissucipto",
          email: "harisssucipto@gmail.com",
          password: "a",
          listAsId: 1,
          gender: "male",
          phone: "0895326993126",
          address: "Buru Karimun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fullName: "pemilik",
          username: "pemilik",
          email: "harisssucipto@gmail.com",
          password: "b",
          listAsId: 2,
          gender: "male",
          phone: "0895326993126",
          address: "Buru Karimun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
