const router = require('express').Router();
const { getCatalog } = require('../controllers/catalog.controller');
router.get('/catalog', getCatalog);
module.exports = router;
