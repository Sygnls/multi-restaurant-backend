const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('./config/cors');
const { errorHandler } = require('./middleware/error');
const { tenantResolver } = require('./middleware/tenant');
const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes');
const sequelize = require('./config/db');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors);
app.use(morgan('dev'));

// health (no tenant needed)
app.get('/health', async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, db: 'connected' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Tenant-scoped routes
app.use(tenantResolver);
app.use('/public', publicRoutes);
app.use('/admin', adminRoutes);

// Errors
app.use(errorHandler);

module.exports = app;
