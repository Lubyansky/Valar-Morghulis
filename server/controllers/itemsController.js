const itemsService = require('../services/itemsService')

class itemsContoller {
    
    async getItems(req, res, next) {
        try {
            const {query, limit, page, sort_asc, sort_desc} = req.query
            var items = await itemsService.getItems(query, limit, page, sort_asc, sort_desc);
            return res.status(200).json(items);
        } 
        catch (e) {
            next(e);
        }
    }

    async getItem(req, res, next) {
        try {
            const id = req.params.id
            var item = await itemsService.getItem(id);
            return res.status(200).json(item);
        } 
        catch (e) {
            next(e);
        }
    }

    async addItem(req, res, next) {
        try {
            const {item_type, quality, owner} = req.body
            const item = await itemsService.addItem(item_type, quality, owner);
            return res.status(200).json(item);
        } 
        catch (e) {
            next(e);
        }
    }

    async updateItem(req, res, next) {
        try {
            const id = req.params.id
            const {item_type, quality, owner} = req.body
            const item = await itemsService.updateItem(id, item_type, quality, owner);
            return res.status(200).json(item);
        } 
        catch (e) {
            next(e);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const id = req.params.id
            const item = await itemsService.deleteItem(id);
            return res.status(200).json({message: item ? "Предмет был успешно удален" : "Предмет не был удален"});
        } 
        catch (e) {
            next(e);
        }
    }

}
  
module.exports =  new itemsContoller()