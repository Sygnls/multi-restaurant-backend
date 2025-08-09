'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: { type: Sequelize.STRING, primaryKey: true },
      tenantId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Tenants', key: 'id' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
      },
      name: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false },
      sortOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('Categories', ['tenantId', 'slug'], { unique: true, name: 'cat_tenant_slug_uq' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Categories');
  }
};
