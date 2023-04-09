const {Message, Personage} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class messagesService {

    async getMessages(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes: [
                'id', 
                'sender_id',
                [Sequelize.col('sender.name'), 'sender_name'], 
                'recipient_id', 
                [Sequelize.col('recipient.name'), 'recipient_name'], 
                'text',
                'createdAt',
                'updatedAt'],
            include: [
                {
                    model: Personage,
                    as: 'sender',
                    attributes: [],
                },
                {
                    model: Personage,
                    as: 'recipient',
                    attributes: [],
                }
            ],
            raw: true,
            order: [
                [sortBy, sortingDirection]
            ],
            limit,
            offset
        }

        if(query){
            queryParams.where = {
                [Op.or]: [  
                    { text: { [Op.iLike]: `%${query}%` }},
                    { '$sender.name$': { [Op.iLike]: `%${query}%` }},
                    { '$recipient.name$': { [Op.iLike]: `%${query}%` }},
                    { '$sender.id$': { [Op.eq]: !isNaN(query) ? query : -1 }},
                    { '$recipient.id$': { [Op.eq]: !isNaN(query) ? query : -1 }}
                ],
            }
        }

        const messages = await Message.findAndCountAll(queryParams)
        
        return messages
    }

    async getPersonageMessages(id){

        const messages = await Message.findAndCountAll({
            attributes: {
                include: [
                    [Sequelize.col('sender.name'), 'sender_name'], 
                    [Sequelize.col('recipient.name'), 'recipient_name'],
                ]
            },
            include: [
                {
                    model: Personage,
                    as: 'sender',
                    attributes: [],
                },
                {
                    model: Personage,
                    as: 'recipient',
                    attributes: [],
                }
            ],
            raw: true,
            where: {
                [Op.or]: [
                    {sender_id: id},
                    {recipient_id: id}
                ]
            },
            order: [
                ['id', 'ASC']
            ],
        })
        
        return messages
    }

    async getMessage(id){
        const message = await Message.findOne({
            attributes: [
                'id', 
                'sender_id',
                [Sequelize.col('sender.name'), 'sender_name'], 
                'recipient_id', 
                [Sequelize.col('recipient.name'), 'recipient_name'], 
                'text',
                'createdAt',
                'updatedAt'],
            include: [
               {
                    model: Personage,
                    as: 'sender',
                    attributes: [],
                },
                {
                    model: Personage,
                    as: 'recipient',
                    attributes: [],
                }
            ],
            raw: true,
            where: {id}
        })
        return message
    }

    async addMessage(sender_id, recipient_id, text){
        if(!sender_id) {
            return {message: 'There is no parameter \"sender_id\"'}
        }
        if(!recipient_id) {
            return {message: 'There is no parameter \"recipient_id\"'}
        }
        if(!text) {
            return {message: 'There is no parameter \"text\"'}
        }
        if(sender_id === recipient_id){
            return {message: 'The field \"sender_id\" must not be equal to the field \"recipient_id\"'}
        }
        
        const message = await Message.create({
            sender_id,
            recipient_id,
            text
        })
        return message
    }

    async updateMessage(id, text){
        if(!text){
            return {message: 'There is no parameter \"text\"'}
        }
        const message = await Message.findByPk(id)
        if(text != message.text){
            await message.update({text})
        }
        return message
    }

    async deleteMessage(id){
        const message = await Message.destroy({where:{id}})
        return message
    }

}

module.exports = new messagesService();
