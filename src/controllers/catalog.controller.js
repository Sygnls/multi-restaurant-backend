const catalogService = require('../services/catalog.service');

exports.getCatalog = async (req, res, next) => {
  try {
    const data = await catalogService.getCatalog(req.tenantId, { includeInactive: false });
    res.json(data);
  } catch (e) { next(e); }
};
