const {Personage, User, Location} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class personagesService {

    async getPersonages(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit ? limit : 10 
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

        const personages = await Personage.findAndCountAll(queryParams)
        
        return personages
    }

    async getPersonage(id){
        const personage = await Personage.findOne({
            attributes: {
                include: [
                    [Sequelize.col('location.name'), 'location']
                ]
            },
            include: [
                {
                    model: Location,
                    attributes: []
                }
            ],
            raw: true,
            where: {id}
        })
        return personage
    }

    async getUserPersonages(user_id){
        const personage = await Personage.findAndCountAll({
            /*include: [
                {
                    as: "personage",
                    model: User,
                    attributes:[],
                    where:{
                        id: user_id
                    }
                }
            ]*/
            where: {user_id}
        })
        return personage
    }

    async addPersonage(user_id, name, personageClass, level, position){
        if(!name) {
            return {message: 'There is no parameter \"name\"'}
        }
        if(!personageClass) {
            return {message: 'There is no parameter \"personageClass\"'}
        }

        const personage = Personage.create({
            name,
            personageClass, 
            //level,
            //position,
            user_id
        })

        return personage
    }

    async updatePersonage(id, name, personClass, level, position){
        const personage = await Personage.findByPk(id)
        const updatedpersonage = {
            id: personage.id,
            name: name ? name : personage.name,
            personClass: personClass ? personClass : personage.personClass,
            level: level ? level : personage.level,
            createdAt: personage.createdAt,
            updatedAt: personage.updatedAt,
            position: position ? position : personage.position,
        }
        if(JSON.stringify(personage) != JSON.stringify(updatedpersonage)){
            await personage.update({
                name: updatedpersonage.name,
                personClass: updatedpersonage.personClass,
                level: updatedpersonage.level,
                position: updatedpersonage.position
            })
        }
        return personage
    }

    async deletePersonage(id){
        const personage = await Personage.destroy({where:{id}})
        return personage
    }

}

module.exports = new personagesService();
