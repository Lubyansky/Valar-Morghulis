const Router = require('express')
const router = new Router()
const locationsController = require('../controllers/locationsController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/locations', locationsController.getLocations);
router.get('/locations/:id', locationsController.getLocation);
router.post('/locations', authMiddleware, locationsController.addLocation);
router.put('/locations/:id', authMiddleware, locationsController.updateLocation);
router.delete('/locations/:id', authMiddleware, locationsController.deleteLocation);

module.exports = router
