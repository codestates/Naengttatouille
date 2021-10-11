const router = require('express').Router();
const { userController } = require('../controllers');

router.post('/signup', userController.signup.post);
router.post('/signin', userController.signin.post);
router.post('/signout', userController.signout.post);
router.patch('/userinfo/:email', userController.userinfo.patch);
router.delete('/userinfo/:email', userController.userinfo.delete);
router.get('/auth', userController.auth.get);

module.exports = router;
