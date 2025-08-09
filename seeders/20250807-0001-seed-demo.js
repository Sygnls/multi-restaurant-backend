'use strict';
module.exports = {
  async up (q) {
    const now = new Date();
    await q.bulkInsert('Tenants', [{
      id: 'demo', slug: 'demo', name: 'Demo Restaurant', active: true, createdAt: now, updatedAt: now
    }], {});
    await q.bulkInsert('DomainMappings', [{
      host: 'demo.localhost', isPrimary: true, tenantId: 'demo', createdAt: now, updatedAt: now
    }], {});
    await q.bulkInsert('Categories', [{
      id: 'c_burgers', tenantId: 'demo', name: 'Burgers', slug: 'burgers', sortOrder: 1, isActive: true, createdAt: now, updatedAt: now
    }], {});
    await q.bulkInsert('Items', [{
      id: 'i_classic_burger', tenantId: 'demo', categoryId: 'c_burgers', name: 'Classic Burger',
      slug: 'classic-burger', description: 'Beef patty, cheese, lettuce, tomato.', price: 899, imageUrl: null,
      isActive: true, createdAt: now, updatedAt: now
    }], {});
  },
  async down (q) {
    await q.bulkDelete('Items', { tenantId: 'demo' }, {});
    await q.bulkDelete('Categories', { tenantId: 'demo' }, {});
    await q.bulkDelete('DomainMappings', { tenantId: 'demo' }, {});
    await q.bulkDelete('Tenants', { id: 'demo' }, {});
  }
};
