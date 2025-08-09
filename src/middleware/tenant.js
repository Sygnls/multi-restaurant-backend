const { DomainMapping, Tenant } = require('../db/models');

function parseHost(h) {
  return (h || '').toLowerCase().split(':')[0];
}

async function resolveTenantIdByHost(host) {
  if (host === 'localhost' || /\.localhost$/.test(host)) {
    const demo = await Tenant.findByPk('demo');
    if (demo?.active) return 'demo';
  }
  const map = await DomainMapping.findOne({ where: { host } });
  if (map) return map.tenantId;

  const parts = host.split('.');
  if (parts.length >= 3) {
    const sub = parts[0];
    const t = await Tenant.findByPk(sub);
    if (t?.active) return t.id;
  }
  return null;
}

async function tenantResolver(req, res, next) {
  const host = parseHost(req.headers['x-forwarded-host'] || req.headers.host || '');
  const tenantId = await resolveTenantIdByHost(host);
  if (!tenantId) return res.status(404).json({ error: 'Tenant not found' });
  req.tenantId = tenantId;
  next();
}

module.exports = { tenantResolver };
