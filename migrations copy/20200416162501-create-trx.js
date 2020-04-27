"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Trxes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      checkin: {
        type: Sequelize.DATE,
      },
      checkout: {
        type: Sequelize.DATE,
      },
      houseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Houses",
          key: "id",
        },
      },
      tenantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      total: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      attachment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Trxes");
  },
};
