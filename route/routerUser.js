const router = require('express').Router();
const userController = require('../Controllers/userController')


router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.post('/update/:id', userController.update)

router.get('/users', userController.users)

router.get('/get_user/:id', userController.singleUser)

router.get('/user/refresh_token', userController.refreshToken)

router.post('/user/logout', userController.logout)

router.delete('/delete/:id', userController.deleteUser)



module.exports = router;