const { Category, Item } = require('../db/models');

exports.getCatalog = async (tenantId, { includeInactive = false } = {}) => {
  const where = { tenantId, ...(includeInactive ? {} : { isActive: true }) };
  const [categories, items] = await Promise.all([
    Category.findAll({ where, order: [['sortOrder', 'ASC']] }),
    Item.findAll({ where })
  ]);
  return { tenantId, categories, items };
};
