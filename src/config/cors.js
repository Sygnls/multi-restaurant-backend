const cors = require('cors');
const { DomainMapping } = require('../db/models');

async function isAllowedOrigin(origin) {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    const host = url.host.toLowerCase();
    if (/\.localhost:\d+$/.test(host)) return true; // dev convenience
    const map = await DomainMapping.findOne({ where: { host } });
    return !!map;
  } catch {
    return false;
  }
}

module.exports = cors({
  origin: (origin, cb) => {
    isAllowedOrigin(origin).then(ok => cb(ok ? null : new Error('CORS blocked'), ok));
  },
  credentials: true
});
