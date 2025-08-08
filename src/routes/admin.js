const { Router } = require('express');
const { Category, Item } = require('../db/models');
const router = Router();

// TODO: add auth + RBAC in Step 2

router.post('/categories', async (req, res, next) => {
  try {
    const tenantId = req.tenantId;
    const { id, name, slug, sortOrder = 0 } = req.body;
    const created = await Category.create({ id, tenantId, name, slug, sortOrder });
    res.json(created);
  } catch (e) { next(e); }
});

router.post('/items', async (req, res, next) => {
  try {
    const tenantId = req.tenantId;
    const { id, categoryId, name, slug, description, price, imageUrl } = req.body;
    const created = await Item.create({ id, tenantId, categoryId, name, slug, description, price, imageUrl });
    res.json(created);
  } catch (e) { next(e); }
});

module.exports = router;
