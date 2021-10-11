const router = require('express').Router();
const { ingredientController } = require('../controllers');

router.get('/', ingredientController.ingredient.get);
router.post('/', ingredientController.ingredient.post);
router.delete('/', ingredientController.ingredient.delete);

module.exports = router;
