'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: { type: DataTypes.STRING, primaryKey: true },
    tenantId: { type: DataTypes.STRING, allowNull: false },
    categoryId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.INTEGER, allowNull: false },
    imageUrl: DataTypes.STRING,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Tenant, { foreignKey: 'tenantId' });
    Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return Item;
};
