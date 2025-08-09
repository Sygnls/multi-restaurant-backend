const router = require('express').Router();
// TODO: add auth + RBAC in next step
router.get('/_ping', (_req, res) => res.json({ ok: true }));
module.exports = router;
