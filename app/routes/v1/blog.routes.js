const router = require('express').Router();

const controller = require('../../controller/blog.controller')
const { authenticateUser, authorizePermissions } = require('../../middleware');

router.post('/', authenticateUser, authorizePermissions('admin'), controller.createBlog)
router.get('/', controller.getBlogs)
router.post('/upload', controller.uploadProductImage)

router.get('/:id', controller.getBlogByID)
router.delete('/:id', controller.deleteBlog)


module.exports = router;