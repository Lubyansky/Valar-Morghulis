const locationsService = require('../services/locationsService')

class locationsContoller {
    
    async getLocations(req, res, next) {
        try {
            const {query, limit, page, sort_asc, sort_desc} = req.query
            const locations = await locationsService.getLocations(query, limit, page, sort_asc, sort_desc);
            return res.status(200).json(locations);
        } 
        catch (e) {
            next(e);
        }
    }

    async getLocation(req, res, next) {
        try {
            const id = req.params.id
            const location = await locationsService.getLocation(id);
            return res.status(200).json(location);
        } 
        catch (e) {
            next(e);
        }
    }

    async addLocation(req, res, next) {
        try {
            const {name, description, type} = req.body
            const location = await locationsService.addLocation(name, description, type);
            return res.status(200).json(location);
        } 
        catch (e) {
            next(e);
        }
    }

    async updateLocation(req, res, next) {
        try {
            const id = req.params.id
            const {name, description, type} = req.body
            const location = await locationsService.updateLocation(id, name, description, type);
            return res.status(200).json(location);
        } 
        catch (e) {
            next(e);
        }
    }

    async deleteLocation(req, res, next) {
        try {
            const id = req.params.id
            const location = await locationsService.deleteLocation(id);
            return res.status(200).json({message: location ? "Локация была успешно удалена" : "Локация не была удалена"});
        } 
        catch (e) {
            next(e);
        }
    }

}
  
module.exports =  new locationsContoller()