'use strict';
module.exports = (sequelize, DataTypes) => {
  const DomainMapping = sequelize.define('DomainMapping', {
    host: { type: DataTypes.STRING, unique: true, allowNull: false },
    isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  DomainMapping.associate = function(models) {
    DomainMapping.belongsTo(models.Tenant, { foreignKey: 'tenantId' });
  };
  return DomainMapping;
};
