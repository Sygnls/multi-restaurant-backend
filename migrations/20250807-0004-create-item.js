'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: { type: Sequelize.STRING, primaryKey: true },
      tenantId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Tenants', key: 'id' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Categories', key: 'id' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
      },
      name: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.INTEGER, allowNull: false },
      imageUrl: { type: Sequelize.STRING },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('Items', ['tenantId', 'slug'], { unique: true, name: 'item_tenant_slug_uq' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};
