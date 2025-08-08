const { Router } = require('express');
const { Category, Item } = require('../db/models');
const router = Router();

router.get('/catalog', async (req, res, next) => {
  try {
    const tenantId = req.tenantId;
    const categories = await Category.findAll({
      where: { tenantId, isActive: true },
      order: [['sortOrder','ASC']]
    });
    const items = await Item.findAll({ where: { tenantId, isActive: true } });
    res.json({ tenantId, categories, items });
  } catch (e) { next(e); }
});

module.exports = router;
