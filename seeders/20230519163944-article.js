'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Indonesia menang lawan Thailand 5-2',
        body: 'Indonesia menang telak',
        approved: true
      },
      {
        title: 'Libur segera tiba',
        body: 'Orang - orang menyerbu tikat pesawat',
        approved: true
      },
      {
        title: 'Cafe baru hadir di Tangerang',
        body: 'Bernuansa pegunungan cafe Tangerang diserbu pasangan yang suka hiking',
        approved: true
      },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
