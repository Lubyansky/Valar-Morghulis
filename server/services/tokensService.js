const jwt = require('jsonwebtoken');
const {SECRET} = require("../config.js")
const ApiError = require('../exceptions/apiError');
const {Token} = require('../models/models')

class TokensService {
    generateTokens(payload) {
        const token = jwt.sign(payload, SECRET, {expiresIn: '48h'})
        return token
    }

    validateToken(token) {
        try {
            const userData = jwt.verify(token, SECRET);
            return userData;
        } 
        catch (e) {
            return null;
        }
    }

    async saveToken(user_id, token) {
        const oldToken = await Token.findOne({where: {user_id}})
        if (oldToken) {
            return await oldToken.update({token})
        }
        else {
            const newToken = await Token.create({token, user_id})
            return newToken;
        }
    }

    async removeToken(token) {
        if(!token){
            throw ApiError.BadRequest('Поле \"token\" не должно быть пустым')
        }
        const _token = await Token.destroy({where:{token}})
        return _token;
    }

    async findToken(token) {
        if(!token){
            throw ApiError.BadRequest('Поле \"token\" не должно быть пустым')
        }
        const _token = await Token.findOne({where:{token}})
        return _token;
    }

    async issueNewToken(user){
        const newToken = this.generateTokens({...user});
        await this.saveToken(user.id, newToken);
        return newToken
    }
}

module.exports = new TokensService();

