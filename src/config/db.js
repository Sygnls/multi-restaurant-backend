const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME || 'mt_ordering',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || null,
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false
  }
);
module.exports = sequelize;
