const {Location} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


class locationsService {

    async getLocations(query, limit, page, sort_asc, sort_desc){
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
                [Op.or]: [ 
                    {name: { [Op.iLike]: `%${query}%` }},
                    {description: { [Op.iLike]: `%${query}%` }},
                    {type: { [Op.iLike]: `%${query}%` }}
                ]
            }
        }

        const locations = await Location.findAndCountAll(queryParams)
        
        return locations
    }

    async getLocation(id){
        const location = await Location.findByPk(id)
        return location
    }

    async addLocation(name, description, type){
        if(!name) {
            return {message: 'There is no parameter \"name\"'}
        }
        if(!type) {
            return {message: 'There is no parameter \"type\"'}
        }
        const location = await Location.create({name, description, type})
        return location
    }

    async updateLocation(id, name, description, type){
        const location = await Location.findByPk(id)
        const updatedLocation = {
            id: id,
            name: name ? name : location.name,
            description: description ? description : location.description,
            type: type ? type : location.type,
            createdAt: location.createdAt,
            updatedAt: location.updatedAt
        }

        if(JSON.stringify(location) != JSON.stringify(updatedLocation)){
            await location.update({
                name: updatedLocation.name,
                description: updatedLocation.description,
                type: updatedLocation.type
            })
        }

        return location
    }

    async deleteLocation(id){
        const location = await Location.destroy({where:{id}})
        return location
    }

}

module.exports = new locationsService();
