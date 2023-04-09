const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ApiError = require('../exceptions/apiError');
const authService = require('../services/authService');

class usersService {

    async getUsers(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes: {
                exclude: [
                    "password"
                ]
            },
            order: [
                [sortBy, sortingDirection]
            ],
            limit,
            offset
        }

        if(query){
            queryParams.where = {
                email: { [Op.iLike]: `%${query}%` }
            }
        }

        const users = await User.findAndCountAll(queryParams)
        
        return users
    }

    async getUser(id){
        const user = await User.findOne({
            attributes: {
                exclude: [
                    "password"
                ]
            },
            where:{id}
        })

        return user
    }

    async updateUser(user_id, token = null, id, email, oldPassword, newPassword){
        try{
            var user = await User.findByPk(id)
            console.log(oldPassword, user.password)
            console.log(oldPassword && !authService.validatePassword(oldPassword, user.password))
            if(oldPassword && !await authService.validatePassword(oldPassword, user.password)){
                throw ApiError.BadRequest('Введен неверный пароль')
            }
            if(newPassword){
                newPassword = await bcrypt.hash(newPassword, 7);
            }

            await user.update({
                email: email,
                password: newPassword
            })

            user = user.toJSON()

            delete user.password

            if(user_id === id && token){
                token = await tokensService.issueNewToken(user);
            }

            return {token, user}
        }
        catch(e){
            throw ApiError.ConflictRequest(e)
            throw ApiError.ConflictRequest("Ошибка при изменении пользователя (вероятнее всего нарушена уникальность email)")
        }
    }

    async deleteUser(id){
        const user = await User.destroy({where:{id}})
        return user
    }

}

module.exports = new usersService();
