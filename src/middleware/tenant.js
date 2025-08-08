const { DomainMapping, Tenant } = require('../db/models');
function parseHost(host) {
  return (host || '').toLowerCase().split(':')[0];
}

async function resolveTenantIdByHost(host) {
  const primary = await DomainMapping.findOne({ where: { host } });
  if (primary) return primary.tenantId;
  // fallback for local dev: anything like foo.localhost -> foo
  const parts = host.split('.');
  if (parts.length >= 3) {
    const sub = parts[0];
    const t = await Tenant.findByPk(sub);
    if (t && t.active) return t.id;
  }
  return null;
}

async function tenantResolver(req, res, next) {
  const host = parseHost(req.headers['x-forwarded-host'] || req.headers.host || '');
  const tenantId = await resolveTenantIdByHost(host);
  if (!tenantId) return res.status(404).json({ error: 'Tenant not found' });
  req.tenantId = tenantId;
  return next();
}

module.exports = { tenantResolver };
