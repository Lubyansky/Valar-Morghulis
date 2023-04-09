const Router = require('express')
const router = new Router()
const usersController = require('../controllers/usersController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);
router.get('/users/:id/personages', usersController.getUserPersonages);
//router.post('/users', usersController.addUser); // Registration in authRoute
router.put('/users/:id', authMiddleware, usersController.updateUser);
router.delete('/users/:id', authMiddleware, usersController.deleteUser);

module.exports = router
