const router = require('express').Router();
const { refrigeratorController } = require('../controllers');

router.get('/refrigerator', refrigeratorController.refrigerator.get);
router.post(
  '/refrigerator/:ingredient',
  refrigeratorController.refrigerator.post
);
router.delete(
  '/refrigerator:ingredient',
  refrigeratorController.refrigerator.delete
);
module.exports = router;
