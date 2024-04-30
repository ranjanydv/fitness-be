const router = require('express').Router();

const controller = require('../../controller/mealDetails.controller');
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createMealDetail);
router.get('/', controller.getMealDetails);
router.get('/:id', controller.getMealDetailById);


module.exports = router;