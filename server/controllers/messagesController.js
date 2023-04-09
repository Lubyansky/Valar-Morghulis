const messagesService = require('../services/messagesService')

class messagesContoller {
    
    async getMessages(req, res, next) {
        try {
            const {query, limit, page, sort_asc, sort_desc} = req.query
            const messages = await messagesService.getMessages(query, limit, page, sort_asc, sort_desc);
            return res.status(200).json(messages);
        } 
        catch (e) {
            next(e);
        }
    }

    async getMessage(req, res, next) {
        try {
            const id = req.params.id
            const message = await messagesService.getMessage(id);
            return res.status(200).json(message);
        } 
        catch (e) {
            next(e);
        }
    }

    async addMessage(req, res, next) {
        try {
            const {sender_id, recipient_id, text} = req.body
            console.log(sender_id, recipient_id, text)
            const message = await messagesService.addMessage(sender_id, recipient_id, text);
            return res.status(200).json(message);
        } 
        catch (e) {
            next(e);
        }
    }

    async updateMessage(req, res, next) {
        try {
            const id = req.params.id
            const text = req.body.text
            const message = await messagesService.updateMessage(id, text);
            return res.status(200).json(message);
        } 
        catch (e) {
            next(e);
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const id = req.params.id
            const message = await messagesService.deleteMessage(id);
            return res.status(200).json({message: message ? "Сообщение было успешно удалено" : "Сообщение не было удалено"});
        } 
        catch (e) {
            next(e);
        }
    }

}
  
module.exports =  new messagesContoller()