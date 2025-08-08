require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./db/models');
const publicRouter = require('./routes/public');
const adminRouter = require('./routes/admin');
const { tenantResolver } = require('./middleware/tenant');
const { errorHandler } = require('./middleware/error');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: (process.env.ALLOWED_ORIGIN || '').split(',').filter(Boolean) || true, credentials: true }));
app.use(morgan('dev'));

app.get('/health', async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, db: 'connected' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Tenant middleware after health
app.use(tenantResolver);

// Public + Admin routes
app.use('/public', publicRouter);
app.use('/admin', adminRouter);

// Errors
app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`[api] listening on :${port}`));
