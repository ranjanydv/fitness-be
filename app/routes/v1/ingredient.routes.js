const router = require('express').Router();

const controller = require('../../controller/ingredient.controller');
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createIngredient);
router.get('/', controller.getIngredients);
router.get('/:id', controller.getIngredientById);


module.exports = router;