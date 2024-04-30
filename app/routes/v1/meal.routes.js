const router = require('express').Router();

const controller = require('../../controller/meal.controller');
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createMeal);
router.get('/', controller.getMeals);
router.get('/:id', controller.getMealById);


module.exports = router;