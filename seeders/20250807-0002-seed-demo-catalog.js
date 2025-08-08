'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      id: 'c_burgers',
      tenantId: 'demo',
      name: 'Burgers',
      slug: 'burgers',
      sortOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Items', [
      {
        id: 'i_classic_burger',
        tenantId: 'demo',
        categoryId: 'c_burgers',
        name: 'Classic Burger',
        slug: 'classic-burger',
        description: 'Beef patty, cheese, lettuce, tomato, special sauce.',
        price: 899,
        imageUrl: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'i_spicy_burger',
        tenantId: 'demo',
        categoryId: 'c_burgers',
        name: 'Spicy Burger',
        slug: 'spicy-burger',
        description: 'Beef patty, jalapeños, pepper jack, chipotle mayo.',
        price: 999,
        imageUrl: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', { tenantId: 'demo' }, {});
    await queryInterface.bulkDelete('Categories', { tenantId: 'demo' }, {});
  }
};
