"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "houses",
      [
        {
          id: 1,
          ownerId: 2,
          cityId: 1,
          name: "House Astina",
          price: 13000000,
          typeRent: "year",
          ameneties: "Furnished",
          bedroom: 5,
          bathroom: 4,
          address: "Tanggerang Selatan, Pondok Aren",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          ownerId: 2,
          name: "Rumah 2",
          cityId: 1,
          price: 13000000,
          typeRent: "year",
          ameneties: "Furnished",
          bedroom: 1,
          bathroom: 3,
          address: "Tanggerang Selatan, Pondok Aren",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          ownerId: 2,
          cityId: 2,
          name: "Rumah 3",
          price: 80000,
          typeRent: "day",
          ameneties: "Shared Accomodation",
          bedroom: 3,
          bathroom: 2,
          address: "Buru Karimun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          cityId: 2,
          ownerId: 2,
          name: "Rumah 4",
          price: 100000,
          typeRent: "month",
          ameneties: "Shared Accomodation;Furnished",
          bedroom: 3,
          bathroom: 2,
          address: "Buru Karimun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          ownerId: 2,
          cityId: 2,
          name: "Rumah 5",
          price: 1022000,
          typeRent: "year",
          ameneties: "Shared Accomodation;Furnished",
          bedroom: 3,
          bathroom: 2,
          address: "Buru Karimun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("houses", null, {});
  },
};
