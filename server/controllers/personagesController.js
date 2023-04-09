const personagesService = require('../services/personagesService')
const itemsService = require('../services/itemsService')
const messagesService = require('../services/messagesService')

class personagesContoller {

    async getPersonages(req, res, next) {
        try {
            const {query, limit, page, sort_asc, sort_desc} = req.query
            const personages = await personagesService.getPersonages(query, limit, page, sort_asc, sort_desc);
            return res.status(200).json(personages);
        } 
        catch (e) {
            next(e);
        }
    }

    async getPersonage(req, res, next) {
        try {
            const id = req.params.id
            const personage = await personagesService.getPersonage(id);
            return res.status(200).json(personage);
        } 
        catch (e) {
            next(e);
        }
    }

    async getPersonageItems(req, res, next) {
        try {
            const id = req.params.id
            const items = await itemsService.getPersonageItems(id);
            return res.status(200).json(items);
        } 
        catch (e) {
            next(e);
        }
    }

    async getPersonageMessages(req, res, next) {
        try {
            const id = req.params.id
            const messages = await messagesService.getPersonageMessages(id);
            return res.status(200).json(messages);
        } 
        catch (e) {
            next(e);
        }
    }

    async addPersonage(req, res, next) {
        try {
            const {id: user_id} = req.user
            const {name, personageClass, level, position} = req.body
            const personage = await personagesService.addPersonage(user_id, name, personageClass, level, position);
            return res.status(200).json(personage);
        } 
        catch (e) {
            next(e);
        }
    }

    async updatePersonage(req, res, next) {
        try {
            const id = req.params.id
            const {name, personageClass, level, position} = req.body
            const personage = await personagesService.updatePersonage(id, name, personageClass, level, position);
            return res.status(200).json(personage);
        } 
        catch (e) {
            next(e);
        }
    }

    async deletePersonage(req, res, next) {
        try {
            const id = req.params.id
            const personage = await personagesService.deletePersonage(id);
            return res.status(200).json({message: personage ? "Игрок был успешно удален" : "Игрок не был удален"});
        } 
        catch (e) {
            next(e);
        }
    }

}
  
module.exports =  new personagesContoller()