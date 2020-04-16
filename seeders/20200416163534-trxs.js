"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "trxs",
      [
        {
          id: 1,
          checkin: new Date(),
          checkout: new Date(),
          houseId: 1,
          tenantId: 1,
          total: 2500000,
          status: "waiting payment",
          attachment: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          checkin: new Date(),
          checkout: new Date(),
          houseId: 2,
          tenantId: 1,
          total: 3500000,
          status: "cancel",
          attachment: "bca.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          checkin: new Date(),
          checkout: new Date(),
          houseId: 3,
          tenantId: 1,
          total: 4500000,
          status: "approve",
          attachment: "bni.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("trxs", null, {});
  },
};
