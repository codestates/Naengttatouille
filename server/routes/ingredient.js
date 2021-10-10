const router = require('express').Router();
const { ingredientController } = require('../controllers');

router.get('/ingredient', ingredientController.ingredient.get);
router.post('/ingredient', ingredientController.ingredient.post);
router.delete('/ingredient', ingredientController.ingredient.delete);

module.exports = router;
