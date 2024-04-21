const router = require('express').Router();

const controller = require('../../controller/auth.controller')


router.post('/register', controller.registerUser)


module.exports = router;