const router = require('express').Router();

const controller = require('../../controller/workout.controller');
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createWorkout)
router.get('/', controller.getWorkouts)
router.get('/:id', controller.getWorkoutByID)
router.delete('/:id', controller.deleteWorkout)


module.exports = router;