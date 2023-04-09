const Router = require('express')
const router = new Router()
const messagesController = require('../controllers/messagesController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/messages', messagesController.getMessages);
router.get('/messages/:id', messagesController.getMessage);
router.post('/messages', authMiddleware, messagesController.addMessage);
router.put('/messages/:id', authMiddleware, messagesController.updateMessage);
router.delete('/messages/:id', authMiddleware, messagesController.deleteMessage);

module.exports = router
