const Router = require('express')
const router = new Router()
const itemsController = require('../controllers/itemsController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/items', itemsController.getItems);
router.get('/items/:id', itemsController.getItem);
router.post('/items', authMiddleware, itemsController.addItem);
router.put('/items/:id', authMiddleware, itemsController.updateItem);
router.delete('/items/:id', authMiddleware, itemsController.deleteItem);

module.exports = router
