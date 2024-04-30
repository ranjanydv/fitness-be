const router = require('express').Router();

const controller = require('../../controller/weather.controller');
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createWeather)
router.get('/', controller.getWeatherData)
router.get('/:id', controller.getWeatherDataById)
router.delete('/:id', controller.deleteWeatherData)


module.exports = router;