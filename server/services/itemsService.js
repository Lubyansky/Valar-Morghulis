const {Item, ItemType, Personage} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class itemsService {

    async getItems(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes: [
                'id', 
                ['item_type', 'item_type_id'],
                [Sequelize.col('itemType.name'), 'item_type_name'], 
                'quality', 
                ['owner', 'owner_id'], 
                [Sequelize.col('personage.name'), 'owner_name'], 
                'createdAt',
                'updatedAt'],
            include: [
                {
                    model: ItemType,
                    attributes: [],
                },
                {
                    model: Personage,
                    attributes: [],
                },
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
                    { '$personage.name$': { [Op.iLike]: `%${query}%` }},
                    { '$personage.id$': { [Op.eq]: !isNaN(query) ? query : -1 }},
                    { '$itemType.name$': { [Op.iLike]: `%${query}%` }}
                ],
            }
        }

        const items = await Item.findAndCountAll(queryParams)
        
        return items
    }

    async getPersonageItems(id){

        const items = await Item.findAndCountAll({
            attributes: {
                include: [
                    ['item_type', 'item_type_id'],
                    ['owner', 'owner_id'], 
                    [Sequelize.col('itemType.name'), 'item_type_name'], 
                ]
            },
            include: [
                {
                    model: ItemType,
                    attributes: [],
                },
                {
                    model: Personage,
                    attributes: [],
                },
            ],
            raw: true,
            where: {owner: id}
        })
        
        return items
    }

    async getItem(id){
        const item = await Item.findOne({
            attributes: [
                'id', 
                ['item_type', 'item_type_id'],
                [Sequelize.col('itemType.name'), 'item_type_name'], 
                'quality', 
                ['owner', 'owner_id'], 
                [Sequelize.col('personage.name'), 'owner_name'], 
                'createdAt',
                'updatedAt'],
            include: [
                {
                    model: ItemType,
                    attributes: [],
                },
                {
                    model: Personage,
                    attributes: [],
                },
            ],
            raw: true,
            where: {id}
        })
        return item
    }

    async addItem(item_type, quality, owner){
        if(!item_type) {
            return {message: 'There is no parameter \"item_type\"'}
        }
        if(!owner) {
            return {message: 'There is no parameter \"owner\"'}
        }
        
        const item = Item.create({
            item_type,
            quality, 
            owner
        })

        return item
    }

    async updateItem(id, item_type, quality, owner){
        const item = await Item.findByPk(id)

        var updatedItem = {
            id: id,
            quality: quality ? quality : item.quality,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            item_type: item_type ? item_type : item.item_type,
            owner: owner ? owner : item.owner,
        }

        if(JSON.stringify(item) != JSON.stringify(updatedItem)){
            await item.update({
                quality: updatedItem.quality,
                item_type: updatedItem.item_type,
                owner: updatedItem.owner
            })
        }
        return item

    }

    async deleteItem(id){
        const item = await Item.destroy({where:{id}})
        return item
    }

}

module.exports = new itemsService();
