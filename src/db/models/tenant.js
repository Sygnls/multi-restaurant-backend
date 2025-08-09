'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    id: { type: DataTypes.STRING, primaryKey: true },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  Tenant.associate = function(models) {
    Tenant.hasMany(models.DomainMapping, { foreignKey: 'tenantId' });
    Tenant.hasMany(models.Category, { foreignKey: 'tenantId' });
    Tenant.hasMany(models.Item, { foreignKey: 'tenantId' });
  };
  return Tenant;
};
