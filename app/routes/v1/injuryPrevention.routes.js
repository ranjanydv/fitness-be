const router = require('express').Router();

const controller = require('../../controller/injuryPrevention.controller')
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createTip)
router.get('/', controller.getTips)
router.get('/:id', controller.getTipById)


module.exports = router;