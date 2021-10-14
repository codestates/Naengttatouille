const router = require('express').Router();
const { refrigeratorController } = require('../controllers');

router.get('/', refrigeratorController.refrigerator.get);
router.post('/:ingredient_id', refrigeratorController.refrigerator.post);
router.delete('/:ingredient_id', refrigeratorController.refrigerator.delete);
module.exports = router;
