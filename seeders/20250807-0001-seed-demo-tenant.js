'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tenants', [{
      id: 'demo',
      slug: 'demo',
      name: 'Demo Restaurant',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('DomainMappings', [{
      host: 'demo.localhost',
      isPrimary: true,
      tenantId: 'demo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DomainMappings', { tenantId: 'demo' }, {});
    await queryInterface.bulkDelete('Tenants', { id: 'demo' }, {});
  }
};
