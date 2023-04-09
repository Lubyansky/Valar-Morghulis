const bcrypt = require('bcrypt')
const {User, Token} = require('../models/models')
const tokensService = require('../services/tokensService');
const Sequelize = require("sequelize");
const ApiError = require('../exceptions/apiError');


class authService {

    async registration(email, password) {
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            if(candidate.role = 'admin'){
                throw ApiError.BadRequest('')
            }
            else throw ApiError.ForbiddenRequest(`User "${email}" already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 7);
        var user = await User.create({
            password: hashPassword,
            email
        })
        user = user.toJSON()
        const token = tokensService.generateTokens({...user});
        await tokensService.saveToken(user.id, token);
        return {token, user}
    }

    async login(email, password) {
        var user = await User.findOne({
            where: {email}
        })
        user = user.toJSON()
        console.log(user)
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким именем не найден')
        }
        const isPassEquals = await this.validatePassword(password, user.password);
        if (!isPassEquals) {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
        delete user.password
        const token = await tokensService.issueNewToken(user);
        console.log(token, user)
        return {token, user}
    }

    async logout(token) {
        const _token = await tokensService.removeToken(token);
        return _token;
    }

    async getUser(id){
        const user = await User.findOne({
            attributes: {
                exclude: [
                    "password"
                ]
            },
            raw: true,
            where: {id}
        })

        return user
    }

    async validatePassword(verifyPass, realPassword){
        if(!verifyPass || !realPassword){
            return false
        }
        return await bcrypt.compare(verifyPass, realPassword);
    }
}

module.exports = new authService();
