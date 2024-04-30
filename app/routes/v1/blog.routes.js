const router = require('express').Router();

const controller = require('../../controller/blog.controller')
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createBlog)
router.get('/', controller.getBlogs)
router.get('/:id', controller.getBlogByID)


module.exports = router;