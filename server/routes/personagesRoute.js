const Router = require('express')
const router = new Router()
const personagesController = require('../controllers/personagesController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/personages', personagesController.getPersonages);
router.get('/personages/:id', personagesController.getPersonage);
router.get('/personages/:id/items', personagesController.getPersonageItems);
router.get('/personages/:id/messages', personagesController.getPersonageMessages);
router.post('/personages', authMiddleware, personagesController.addPersonage);
router.put('/personages/:id', authMiddleware, personagesController.updatePersonage);
router.delete('/personages/:id', authMiddleware, personagesController.deletePersonage);

module.exports = router
