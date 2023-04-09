const Router = require('express')
const router = new Router()
const itemTypesController = require('../controllers/itemTypesController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/item-types', itemTypesController.getItemTypes);
router.get('/item-types/:id', itemTypesController.getItemType);
router.post('/item-types', authMiddleware, itemTypesController.addItemType);
router.put('/item-types/:id', authMiddleware, itemTypesController.updateItemType);
router.delete('/item-types/:id', authMiddleware, itemTypesController.deleteItemType);

module.exports = router