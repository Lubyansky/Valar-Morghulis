const itemTypesService = require('../services/itemTypesService')

class itemTypesContoller {

    async getItemTypes(req, res, next) {
        try {
            const {query, limit, page, sort_asc, sort_desc} = req.query
            const itemTypes = await itemTypesService.getItemTypes(query, limit, page, sort_asc, sort_desc);
            return res.status(200).json(itemTypes);
        } 
        catch (e) {
            next(e);
        }
    }

    async getItemType(req, res, next) {
        try {
            const id = req.params.id
            const itemType = await itemTypesService.getItemType(id);
            return res.status(200).json(itemType);
        } 
        catch (e) {
            next(e);
        }
    }

    async addItemType(req, res, next) {
        try {
            const name = req.body.name
            const itemType = await itemTypesService.addItemType(name);
            return res.status(200).json(itemType);
        } 
        catch (e) {
            next(e);
        }
    }

    async updateItemType(req, res, next) {
        try {
            const id = req.params.id
            const name = req.body.name
            const itemType = await itemTypesService.updateItemType(id, name);
            return res.status(200).json(itemType);
        } 
        catch (e) {
            next(e);
        }
    }

    async deleteItemType(req, res, next) {
        try {
            const id = req.params.id
            const item = await itemTypesService.deleteItemType(id);
            return res.status(200).json({message: item ? "Тип предмета был успешно удален" : "Тип предмета не был удален"});
        } 
        catch (e) {
            next(e);
        }
    }

}
  
module.exports =  new itemTypesContoller()