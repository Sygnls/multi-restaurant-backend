'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.STRING, primaryKey: true },
    tenantId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  Category.associate = function(models) {
    Category.belongsTo(models.Tenant, { foreignKey: 'tenantId' });
    Category.hasMany(models.Item, { foreignKey: 'categoryId' });
  };
  return Category;
};
