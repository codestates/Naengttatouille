const router = require('express').Router();
const { refrigeratorController } = require('../controllers');

router.get('/refrigerator', refrigeratorController.refrigerator.get);

module.exports = router;
