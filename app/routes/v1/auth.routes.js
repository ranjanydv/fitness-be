const router = require('express').Router();

const controller = require('../../controller/auth.controller')

router.post('/register', controller.registerUser)
router.post('/login', controller.login)


module.exports = router;