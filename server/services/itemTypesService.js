const {ItemType} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


class itemTypesService {

    async getItemTypes(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit || 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            order: [
                [sortBy, sortingDirection]
            ],
            limit,
            offset
        } 

        if(query){
            queryParams.where = {
                name: { [Op.iLike]: `%${query}%` }
            }
        }

        const itemTypes = await ItemType.findAndCountAll(queryParams)
        
        return itemTypes
    }

    async getItemType(id){
        const itemType = await ItemType.findByPk(id)
        return itemType
    }

    async addItemType(name){
        if(!name) {
            return {message: 'There is no parameter \"name\"'}
        }
        const itemType = await ItemType.create({name})
        return itemType
    }

    async updateItemType(id, name){
        if(!name){
            return {message: 'There is no parameter \"name\"'}
        }
        const itemType = await ItemType.findByPk(id)
        if(name != itemType.name){
            await itemType.update({name})
        }
        return itemType
    }

    async deleteItemType(id){
        const itemType = await ItemType.destroy({where:{id}})
        return itemType
    }

}

module.exports = new itemTypesService();
