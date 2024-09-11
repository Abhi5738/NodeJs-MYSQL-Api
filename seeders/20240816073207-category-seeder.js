"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("categories", [
      {
        name: "NextJs",
      },
      {
        name: "ReactJs",
      },
      {
        name: "Express Js",
      },
      {
        name: "NodeJs",
      },
      {
        name: "Laravel",
      },
      {
        name: "flutter",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("categories", null, {});
  },
};
