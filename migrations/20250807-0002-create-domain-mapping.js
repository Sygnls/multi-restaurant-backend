'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DomainMappings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      host: { type: Sequelize.STRING, allowNull: false, unique: true },
      isPrimary: { type: Sequelize.BOOLEAN, defaultValue: false },
      tenantId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Tenants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DomainMappings');
  }
};
