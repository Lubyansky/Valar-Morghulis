const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authMiddleware.js')
const authController = require('../controllers/authController.js')

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/user', authMiddleware, authController.getUser);

module.exports = router
