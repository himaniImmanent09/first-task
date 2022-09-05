const router = require('express').Router();
const blogController = require('../Controllers/blogController')

router.post('/blogs/create/:id', blogController.postblogData)
router.get('/blogs/all',blogController.allblogs)
router.get('/blogs/getdata/:id', blogController.getblogData)
router.get('/blogs/getSingleData/:id', blogController.getSingleBlog)
router.post('/blogs/update/:id', blogController.updateSingleBlog)
router.delete('/blogs/delete/:id', blogController.deleteBlog)


module.exports = router;