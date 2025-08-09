'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tenants', {
      id: { type: Sequelize.STRING, primaryKey: true },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      name: Sequelize.STRING,
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tenants');
  }
};
